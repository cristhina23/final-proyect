import { updateService, deleteService } from "$lib/server/db/queries"
import { json } from '@sveltejs/kit'

export const PUT = async ({ params, request }) => {
  const id = Number(params.id);
  const data = await request.json();

  try {
    const updated = await updateService(id, data);
    return json(updated);
  } catch (err) {
    console.error(err);
    return json({ error: err, message: 'Error updating the service' }, { status: 500 });
  }
}

export const DELETE = async ({ params }) => {
  const id = Number(params.id);

  try {
    const deleted = await deleteService(id);
    return json(deleted);
  } catch (err) {
    console.error(err);
    return json({ error: err, message: 'Error deleting the service' }, { status: 500 });
  }
}
