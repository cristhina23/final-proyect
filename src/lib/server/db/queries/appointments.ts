import { db } from '../index';
import { appointments, appointment_items, users, services } from '../schema';
import { eq, between, desc } from 'drizzle-orm';

//create appointment
export async function createAppointment(data: {
  client_id: string;
  stylist_id?: string;
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
export async function getAppointmentsByClientId(client_id: string) {
  return await db.select().from(appointments).where(eq(appointments.client_id, client_id));
}

// get appointments of a stylist
export async function getAppointmentsByStylistId(stylist_id: string) {
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
    stylist_id?: string;
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

// get all schedule
export async function getSchedule() {
  const appointmentsData = await db
    .select({
      id: appointments.id,
      start_time: appointments.start_time,
      end_time: appointments.end_time,
      status: appointments.status,
      notes: appointments.notes,
      stylist: {
        id: users.id,
        full_name: users.full_name,
        photo_url: users.photo_url
      }
    })
    .from(appointments)
    .leftJoin(users, eq(appointments.stylist_id, users.id))
    .orderBy(desc(appointments.start_time));

  const scheduleWithItems = await Promise.all(
    appointmentsData.map(async (apt) => {
      const items = await db
        .select({
          id: appointment_items.id,
          name: appointment_items.name,
          duration: appointment_items.duration_snapshot,
          price: appointment_items.price_snapshot,
          service: {
            id: services.id,
            name: services.name
          }
        })
        .from(appointment_items)
        .leftJoin(services, eq(appointment_items.service_id, services.id))
        .where(eq(appointment_items.appointment_id, apt.id));
      
      return { ...apt, items };
    })
  );

  return scheduleWithItems;
}

// get appointments for a specific client with details
export async function getClientAppointments(client_id: string) {
  const appointmentsData = await db
    .select({
      id: appointments.id,
      start_time: appointments.start_time,
      end_time: appointments.end_time,
      status: appointments.status,
      notes: appointments.notes,
      stylist: {
        id: users.id,
        full_name: users.full_name,
        photo_url: users.photo_url
      }
    })
    .from(appointments)
    .leftJoin(users, eq(appointments.stylist_id, users.id))
    .where(eq(appointments.client_id, client_id))
    .orderBy(desc(appointments.start_time));

  const appointmentsWithItems = await Promise.all(
    appointmentsData.map(async (apt) => {
      const items = await db
        .select({
          id: appointment_items.id,
          name: appointment_items.name,
          duration: appointment_items.duration_snapshot,
          price: appointment_items.price_snapshot,
          service: {
            id: services.id,
            name: services.name,
            // Services table doesn't have an image column based on schema
          }
        })
        .from(appointment_items)
        .leftJoin(services, eq(appointment_items.service_id, services.id))
        .where(eq(appointment_items.appointment_id, apt.id));
      
      return { ...apt, items };
    })
  );

  return appointmentsWithItems;
}
