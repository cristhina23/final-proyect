import { getAllServices } from '$lib/server/db/queries/services';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const services = await getAllServices();
  
 
  const formattedServices = services.map(s => ({
    ...s,
    price: Number(s.price)
  }));

  return {
    services: formattedServices
  };
};
