import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { availabilityService } from '$lib/server/db/queries/availability';

export const GET: RequestHandler = async ({ url }) => {
  const stylistId = url.searchParams.get('stylistId');
  const dateStr = url.searchParams.get('date');
  const duration = parseInt(url.searchParams.get('duration') || '60');

  if (!stylistId || !dateStr) {
    return json({ error: 'Missing stylistId or date' }, { status: 400 });
  }

  try {
    // Create date in local time to avoid timezone shifting
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const dayOfWeek = date.getDay();

    console.log(`--- AVAILABILITY API ---`);
    console.log(`Stylist ID: ${stylistId}`);
    console.log(`Date: ${dateStr} (Day of week: ${dayOfWeek})`);
    console.log(`Duration: ${duration}`);

    const slots = await availabilityService.getAvailableTimeSlots(
      stylistId,
      date,
      duration
    );

    console.log(`Generated slots count: ${slots.length}`);
    console.log('Incoming date raw:', date);
    console.log('Day of week calculated:', date.getDay());

    return json(slots);
  } catch (err) {
    console.error('Error fetching availability:', err);
    return json({ error: 'Error fetching availability' }, { status: 500 });
  }
};
