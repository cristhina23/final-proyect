import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getMySchedule } from '$lib/server/db/queries/appointments';

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await getMySchedule(locals.user.id);
    return json(data);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return json({ error: 'Failed to fetch schedule' }, { status: 500 });
  }
};