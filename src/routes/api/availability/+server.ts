import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAvailableTimeSlots } from '$lib/server/db/queries/availability';

export const GET: RequestHandler = async ({ url }) => {
  const stylistId = url.searchParams.get('stylistId');
  const dateStr = url.searchParams.get('date');
  const duration = parseInt(url.searchParams.get('duration') || '60');

  if (!stylistId || !dateStr) {
    return json({ error: 'Missing stylistId or date' }, { status: 400 });
  }

  try {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    console.log(`--- AVAILABILITY API ---`);
    console.log(`Stylist ID: ${stylistId}`);
    console.log(`Date: ${dateStr} (Day of week: ${dayOfWeek})`);
    console.log(`Duration: ${duration}`);

    const slots = await getAvailableTimeSlots(stylistId, date, duration);
    console.log(`Generated slots count: ${slots.length}`);
    
    return json(slots);
  } catch (err) {
    console.error('Error fetching availability:', err);
    return json({ error: 'Error fetching availability' }, { status: 500 });
  }
};
