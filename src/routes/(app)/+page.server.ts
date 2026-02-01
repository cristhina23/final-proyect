import type { PageServerLoad } from '../$types';

export const load = (async ({ fetch }) => {
  try {
    const response = await fetch('/api/stylists');
    
    if (!response.ok) {
      console.error('Failed to fetch stylists');
      return { stylists: [] };
    }
    
    const stylists = await response.json();
    
    interface StylistFromAPI {
      id: number;
      full_name: string | null;
      specialty?: string;
      years_of_experience: number | null;
      notes: string | null;
      photo_url: string | null;
    }
    
    const formattedStylists = (stylists as StylistFromAPI[]).map((stylist) => ({
      id: stylist.id,
      name: stylist.full_name || 'Unknown',
      specialty: stylist.specialty || 'General Stylist',
      experience: stylist.years_of_experience || 0,
      bio: stylist.notes || 'Professional stylist',
      image: stylist.photo_url || 'default-stylist.jpg'
    }));

    return { stylists: formattedStylists };
  } catch (error) {
    console.error('Error loading stylists:', error);
    return { stylists: [] };
  }
}) satisfies PageServerLoad;