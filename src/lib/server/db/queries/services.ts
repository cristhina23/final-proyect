import { services } from "../schema";
import { db } from "../index";
import { eq } from "drizzle-orm";


// Create a new service
export async function createService(data: {
  name: string;
  description: string;
  duration_minutes: number;
  price: string;
  category_id: number;
  is_active?: boolean;
}) {
  const [service] = await db.insert(services).values(data).returning();
  return service;
}

//Get all services
export async function getAllServices() {
  return await db.select().from(services).where(eq(services.is_active, true));
}

//Get services by id
export async function getServiceById(id: number) {
  const [service] = await db.select().from(services).where(eq(services.id, id));
  return service;
}

//Update service
export async function updateService(id: number, data: {
  name: string;
  description: string;
  duration_minutes: number;
  price: string;
  category_id: number;
  is_active: boolean;
}) {
  const [updated] = await db.update(services)
  .set({...data, updatedAt: new Date() })
  .where(eq(services.id, id))
  .returning();
  return updated;
}

//Delete service
export async function deleteService(id: number) {
  const [deleted] = await db.update(services)
  .set({is_active: false, updatedAt: new Date()})
  .where(eq(services.id, id))
  .returning();
  return deleted;
}