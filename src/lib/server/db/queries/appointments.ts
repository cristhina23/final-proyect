
import { db } from '../index';
import { appointments, appointment_items } from '../schema';
import { eq, and, gte, lte, between } from 'drizzle-orm';

//create appointment
export async function createAppointment(data: {
 client_id: number;
  stylist_id?: number;
  start_time: Date;
  end_time: Date;
  status?: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  notes?: string;
}) {
  const [appointment] = await db.insert(appointments).values(data).returning();
  return appointment;
}

// add service to appointment
export async function addAppointmentItem(data: {
  appointment_id: number;
  service_id?: number;
  name: string;
  description: string;
  duration_snapshot: number;
  price_snapshot: string;
  is_extra: boolean;
}) {
  const [appointment_item] = await db.insert(appointment_items).values(data).returning();
  return appointment_item;
}

// get appointments of a client
export async function getAppointmentsByClientId(client_id: number) {
  return await db.select().from(appointments).where(eq(appointments.client_id, client_id));
}

// get appointments of a stylist
export async function getAppointmentsByStylistId(stylist_id: number) {
  return await db.select().from(appointments).where(eq(appointments.stylist_id, stylist_id));
}

// get appointments by date
export async function getAppointmentsByDate(date: Date) {
  const startOfDay = new Date(date);
  const endOfDay = new Date(date);

  startOfDay.setHours(0, 0, 0, 0);
  endOfDay.setHours(23, 59, 59, 999);

  return await db.select().from(appointments).where(between(appointments.start_time, startOfDay, endOfDay));
}

// get appointment by id with the items
export async function getAppointmentById(id: number) {
  const appointment = await db.select().from(appointments).where(eq(appointments.id, id));

  if (!appointment[0]) {
    return null;
  }

  const items = await db.select().from(appointment_items).where(eq(appointment_items.appointment_id, id));

  return { ...appointment[0], items };
}

// update status
export async function updateStatus(
  id: number, 
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED'
) {
  const [updated] = await db.update(appointments).set({ status, updatedAt: new Date() }).where(eq(appointments.id, id)).returning();
  return updated;
}

// reschedule appointment
export async function rescheduleAppointment(
  id: number, 
  data: {
    start_time: Date;
    end_time: Date;
    stylist_id?: number;
  }
) {
  const [updated] = await db.update(appointments).set({ ...data, status: 'RESCHEDULED', updatedAt: new Date() }).where(eq(appointments.id, id)).returning();
  return updated;
}

// cancel-delete appointment
export async function deleteAppointment(id: number) {
  const [cancelled] = await db.update(appointments).set({ status: 'CANCELLED', updatedAt: new Date() }).where(eq(appointments.id, id)).returning();
  return cancelled;
}