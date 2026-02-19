import type { PageServerLoad } from './$types';
import { getAllServices, getStylistsWithServices, getAllCategories } from '$lib/server/db/queries';

export const load: PageServerLoad = async () => {
    const [services, stylists, categories] = await Promise.all([
        getAllServices(),
        getStylistsWithServices(),
        getAllCategories()
    ]);

     return {
        services: services.map(s => ({
            ...s,
            category_id: Number(s.category_id),
            price: s.price                        
        })),
        stylists,
        categories: categories.map(c => ({
            ...c,
            id: Number(c.id)
        }))
    };
};
