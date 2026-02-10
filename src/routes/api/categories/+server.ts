import { createCategory, getAllCategories, getCategoryById } from "$lib/server/db/queries/categories";
import { json } from "@sveltejs/kit";


export async function GET() {
    const categories = await getAllCategories();
    return json(categories);
}

export async function POST({request}: {request: Request}) {
    const data = await request.json();

    const name = data.name.trim();
    const slug = name.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); 
    const is_active = true;

    if(!name) {
        return json({error: "Name is required"}, {status: 400});
    }
    const category = await createCategory({name, slug, is_active});
    return json(category);
}