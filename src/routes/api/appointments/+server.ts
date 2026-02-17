import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { createAppointment, addAppointmentItem } from '$lib/server/db/queries/appointments';

export const POST: RequestHandler = async ({ request, locals }) => {
  // Check if user is authenticated
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { service_id, stylist_id, date, time } = body;

    if (!service_id || !stylist_id || !date || !time) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Get service details for duration and price
    const service = await db.query.services.findFirst({
      where: eq(services.id, service_id)
    });

    if (!service) {
      return json({ error: 'Service not found' }, { status: 404 });
    }

    // 2. Calculate start and end times
    const startDateTimeString = `${date}T${time}:00`;
    const startDate = new Date(startDateTimeString);
    const endDate = new Date(startDate.getTime() + service.duration_minutes * 60000);

    // 3. Create appointment using helper
    const newAppointment = await createAppointment({
      client_id: locals.user.id,
      stylist_id: stylist_id,
      start_time: startDate,
      end_time: endDate,
      status: 'CONFIRMED', // Auto-confirm for now as per requirement
      notes: 'Booked via website'
    });

    if (!newAppointment) {
      throw new Error('Failed to create appointment record');
    }

    // 4. Create appointment item (link service to appointment)
    await addAppointmentItem({
      appointment_id: newAppointment.id,
      service_id: service.id,
      name: service.name,
      description: service.description || '',
      duration_snapshot: service.duration_minutes,
      price_snapshot: service.price.toString(),
      is_extra: false
    });

    return json({
      message: 'Appointment created successfully',
      appointment: {
        ...newAppointment,
        service: {
          name: service.name,
          price: service.price,
          duration: service.duration_minutes
        }
      }
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
    return json({ error: 'Failed to create appointment' }, { status: 500 });
  }
};
