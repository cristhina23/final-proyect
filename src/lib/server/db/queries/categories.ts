import { db } from "..";
import { service_categories } from "../schema";
import { eq, asc } from "drizzle-orm";

// GET ALL (solo activas, ordenadas por nombre)
export async function getAllCategories() {
  return await db.select().from(service_categories).where(eq(service_categories.is_active, true)).orderBy(asc(service_categories.name));
}

// GET BY ID
export async function getCategoryById(id: number) {
  const [category] = await db.select().from(service_categories).where(eq(service_categories.id, id));

  return category ?? null;
}

// CREATE
export async function createCategory(data: {
  name: string;
  slug: string;
  is_active?: boolean;
}) {
  const [category] = await db.insert(service_categories).values(data).returning();

  return category;
}

// UPDATE (parcial)
export async function updateCategory(
  id: number,
  data: Partial<{
    name: string;
    slug: string;
    is_active: boolean;
  }>
) {
  const [updated] = await db.update(service_categories).set(data).where(eq(service_categories.id, id)).returning();

  return updated ?? null;
}

// SOFT DELETE
export async function deleteCategory(id: number) {
  const [deleted] = await db.update(service_categories).set({ is_active: false }).where(eq(service_categories.id, id)).returning();

  return deleted ?? null;
}
