import {db} from '../index';
import {
  stylist_availability,
  stylist_time_off,
  appointments,
  salon_hours
} from '../schema';
import {eq, and, gte, lt, between, ne} from 'drizzle-orm';

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
export async function getStylistAvailability(stylistId: number, dayOfWeek: number) {
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
export async function getStylistTimeOff(stylistId: number, date: Date) {
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
export async function getStylistAppointments(stylistId: number, date: Date) {  // ← Cambiar a Date
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return await db.select()
    .from(appointments)
    .where(
      and(
        eq(appointments.stylist_id, stylistId),
        between(appointments.start_time, startOfDay, endOfDay),
        ne(appointments.status, 'CANCELLED')
      ) 
    );
}

// get available slots for a stylist on a date
export async function getAvailableTimeSlots(
  stylistId: number, 
  date: Date,
  serviceDuration: number 
): Promise<string[]> {
  const dayOfWeek = date.getDay();
  
  //get the stylist schedule for that day
  const availability = await getStylistAvailability(stylistId, dayOfWeek);
  if (availability.length === 0) return []; 
  
  //get the stylist free time for that day
  const timeOff = await getStylistTimeOff(stylistId, date);
  if (timeOff.length > 0 && !timeOff[0].start_time) {
    return []; 
  }
  
  //get the stylist appointments for that day
  const existingAppointments = await getStylistAppointments(stylistId, date);
  
  //generate available slots
  const slots: string[] = [];
  const startMinutes = timeToMinutes(availability[0].start_time);
  const endMinutes = timeToMinutes(availability[0].end_time);
  
  for (let time = startMinutes; time + serviceDuration <= endMinutes; time += 30) {
    const slotStart = minutesToTime(time);
    const slotEnd = minutesToTime(time + serviceDuration);
    
    //check if there is a conflict with existing appointments
    const hasConflict = existingAppointments.some(apt => {
      const startTime = new Date(apt.start_time);  // ← Convertir a Date
      const endTime = new Date(apt.end_time);      // ← Convertir a Date
      
      const aptStart = timeToMinutes(startTime.toTimeString().slice(0, 5));
      const aptEnd = timeToMinutes(endTime.toTimeString().slice(0, 5));
      
      return (time < aptEnd && time + serviceDuration > aptStart);
    });
    
    if (!hasConflict) {
      slots.push(slotStart);
    }
  }
  
  return slots;
}