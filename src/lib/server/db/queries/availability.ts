import {db} from '../index';
import {
  stylist_availability,
  stylist_time_off,
  appointments,
} from '../schema';
import {eq, and, between, ne} from 'drizzle-orm';
import { getSalonHours } from './salon';

// format helper
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// get stylist availability for a date 
export async function getStylistAvailability(stylistId: string, dayOfWeek: number) {
  const availability = await db
    .select()
    .from(stylist_availability)
    .where(
      and(
        eq(stylist_availability.stylist_id, stylistId),
        eq(stylist_availability.day_of_week, dayOfWeek)
      )
    );
  return availability;
}

// get days off for a stylist
export async function getStylistTimeOff(stylistId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return await db.select()
    .from(stylist_time_off)
    .where(
      and(
        eq(stylist_time_off.stylist_id, stylistId),
        between(stylist_time_off.date, startOfDay, endOfDay)
      )
    );
}

// get appointments for a stylist on a date
export async function getStylistAppointments(stylistId: string, date: Date) {
  const dateStr = date.toISOString().split('T')[0];
  
  const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
  const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);
  
  const result = await db.select()
    .from(appointments)
    .where(
      and(
        eq(appointments.stylist_id, stylistId),
        between(appointments.start_time, startOfDay, endOfDay),
        ne(appointments.status, 'CANCELLED')
      ) 
    );
  
  return result;
}

// get available slots for a stylist on a date
export async function getAvailableTimeSlots(
  stylistId: string, 
  date: Date,
  serviceDuration: number 
): Promise<string[]> {
  const dayOfWeek = date.getDay();
  
  // Get stylist schedule for that day
  let availability = await getStylistAvailability(stylistId, dayOfWeek);
  
  // If no stylist availability, fall back to salon hours
  if (availability.length === 0) {
    const allSalonHours = await getSalonHours();
    const specificSalonDay = allSalonHours.find(h => h.day_of_week === dayOfWeek);

    if (specificSalonDay) {
      if (!specificSalonDay.is_open) {
        return [];
      }
      availability = [{
        start_time: specificSalonDay.open_time,
        end_time: specificSalonDay.close_time
      }] as any;
    } else {
      availability = [{
        start_time: '09:00',
        end_time: '18:00'
      }] as any;
    }
  }
  
  // Check for full day off
  const timeOff = await getStylistTimeOff(stylistId, date);
  if (timeOff.length > 0 && !timeOff[0].start_time) {
    return []; 
  }
  
  // Get existing appointments for that day
  const existingAppointments = await getStylistAppointments(stylistId, date);
  
  // Generate available slots
  const slots: string[] = [];
  const startMinutes = timeToMinutes(availability[0].start_time);
  const endMinutes = timeToMinutes(availability[0].end_time);
  
  for (let time = startMinutes; time + serviceDuration <= endMinutes; time += 30) {
    const slotStart = minutesToTime(time);
    
    const hasConflict = existingAppointments.some(apt => {
      const aptStartTime = new Date(apt.start_time);
      const aptEndTime = new Date(apt.end_time);
      
      // Extract hours and minutes directly
      const aptStart = aptStartTime.getHours() * 60 + aptStartTime.getMinutes();
      const aptEnd = aptEndTime.getHours() * 60 + aptEndTime.getMinutes();
      
      return (time < aptEnd && (time + serviceDuration) > aptStart);
    });
    
    if (!hasConflict) {
      slots.push(slotStart);
    }
  }
  
  return slots;
}