import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSchedule } from '$lib/server/db/queries/appointments';

export const GET: RequestHandler = async () => {
  try {
    const schedule = await getSchedule();
    return json(schedule);
  } catch (err) {
    console.error('Error fetching schedule:', err);
    return json({ error: 'Error fetching schedule' }, { status: 500 });
  }
};
