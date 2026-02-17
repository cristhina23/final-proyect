import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSalonHours, updateSalonHours } from '$lib/server/db/queries/salon';

export const GET: RequestHandler = async () => {
  try {
    console.log('--- GET /api/admin/salon-hours ---');
    const hours = await getSalonHours();
    console.log(`Retrieved ${hours.length} salon hours`);
    return json(hours);
  } catch (err) {
    console.error('Error getting salon hours:', err);
    return json({ error: 'Failed to get salon hours', details: String(err) }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  console.log(`--- POST /api/admin/salon-hours ---`);
  console.log(`User: ${locals.user?.id}, Role: ${locals.user?.role}`);

  if (!locals.user || locals.user.role !== 'ADMIN') {
    console.log(`FORBIDDEN: User is not ADMIN`);
    return json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    console.log(`Received payload:`, JSON.stringify(body, null, 2));
    const { hours } = body;
    if (!Array.isArray(hours)) {
      return json({ error: 'Invalid data format' }, { status: 400 });
    }

    const updated = await updateSalonHours(hours);
    return json(updated);
  } catch (err) {
    console.error('Error updating salon hours:', err);
    return json({ error: 'Failed to update salon hours' }, { status: 500 });
  }
};
