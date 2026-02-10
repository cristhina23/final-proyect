import { createService, getAllServices } from "$lib/server/db/queries"
import { json } from '@sveltejs/kit'


export const  GET = async () => {
  try {
    const services = await getAllServices();

    return json(services);
  } catch (err) {
    console.log(err)
    return json({error: err, message: 'sorry we have an error getting the services'})
  }
}

export const POST = async ({ request }) => {
  const data = await request.json();

  if (!data.name || !data.description || !data.duration_minutes || !data.price || !data.category_id) {
    return json({message: 'All fields are required'}, {status: 400});
  }

  if (data.price <= 0 ) {
     return json({message: 'Price must be greater than 0'}, {status: 400});
  }

  if (data.duration_minutes <=0 ) {
     return json({message: 'Duration must be greater than 0'}, {status: 400});
  }

  if (data.duration_minutes % 5 !== 0 ) {
     return json({message: 'Duration must be a multiple of 5'}, {status: 400});
  }

  const serviceCreated = {
    name: data.name as string,
    description: data.description as string,
    duration_minutes: Number(data.duration_minutes),
    price: data.price as string,
    category_id: data.category_id as number,
    is_active: true,
  }

  try {
    const service = await createService(serviceCreated);

    return json(service);
  } catch (err) {
     return json({Error: err, message: 'Error creating the service'}, {status: 500});
  }
}