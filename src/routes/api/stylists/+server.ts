import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { createUser,  getStylistsWithServices,getUserByEmail } from '$lib/server/db/queries';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    const email = (body?.email ?? '').toString().trim();
    const full_name = body?.full_name ? body.full_name.toString().trim() : undefined;
    const phone = body?.phone ? body.phone.toString().trim() : undefined;
    const photo_url = body?.photo_url ? body.photo_url.toString().trim() : undefined;
    const notes = body?.notes ? body.notes.toString().trim() : undefined;
    const age = typeof body?.age === 'number' ? body.age : undefined;
    const years_of_experience = typeof body?.years_of_experience === 'number' ? body.years_of_experience : undefined;
    

    if (!email) {
      return json({ error: 'El email es obligatorio.' }, { status: 400 });
    }

    
    if (!full_name) {
      return json({ error: 'El nombre completo es obligatorio.' }, { status: 400 });
    }

  
    const existing = await getUserByEmail(email);
    if (existing) {
      return json({ error: 'El correo ya está registrado.' }, { status: 409 });
    }

    const stylist = await createUser({
      email,
      role: 'STYLIST',
      full_name,
      phone,
      photo_url,
      notes,
      age,
      years_of_experience,
    });

    return json(stylist, { status: 201 });
  } catch (err) {
    console.error('Error creating stylist', err);
    return json({ error: 'No se pudo crear el estilista.' }, { status: 500 });
  }
};

export const GET: RequestHandler = async () => {
  try {
     const stylists = await getStylistsWithServices(); 
    return json(stylists);
  } catch (err) {
    console.error('Error fetching stylists', err);
    return json({ error: 'No se pudieron obtener los estilistas.' }, { status: 500 });
  }
}
  
