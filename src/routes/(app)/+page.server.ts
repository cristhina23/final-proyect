import type { PageServerLoad } from './$types';
import { getAllServices, getStylistsWithServices } from '$lib/server/db/queries';

export const load: PageServerLoad = async () => {
  try {
    const [services, stylists] = await Promise.all([
      getAllServices(),
      getStylistsWithServices()
    ]);
    
    const formattedStylists = stylists.map((stylist) => ({
      ...stylist,
      name: stylist.full_name || 'Unknown',
      experience: stylist.years_of_experience || 0,
      image: stylist.photo_url || 'default-stylist.jpg',
      bio: stylist.notes || 'Professional stylist'
    }));

    return { 
      services, 
      stylists: formattedStylists 
    };
  } catch (error) {
    console.error('Error loading landing page data:', error);
    return { 
      services: [], 
      stylists: [] 
    };
  }
};