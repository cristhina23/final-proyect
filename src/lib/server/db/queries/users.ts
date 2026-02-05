import { users } from "../schema";
import type { UserRole, AuthProvider } from "../schema";
import { db } from "../index";
import { eq } from "drizzle-orm";
import { getStylistServices } from './stylist-services';

// CREATE USER

export async function createUser(data: {
  email: string;
  password_hash?: string;
  auth_provider?: AuthProvider;
  role: UserRole;
  full_name?: string;
  age?: number;
  years_of_experience?: number;
  photo_url?: string;
  phone?: string;
  notes?: string;
}) {
  const [user] = await db
    .insert(users)
    .values({
      ...data,
      auth_provider: data.auth_provider ?? "EMAIL",
      role: data.role,
    })
    .returning();
  return user;
}


// GET USERS

export async function getAllStylists() {
  return await db.select().from(users).where(eq(users.role, "STYLIST"));
}

export async function getAllUsers() {
  return await db.select().from(users).where(eq(users.role, "CLIENT"));
}

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}


// GET STYLISTS WITH SERVICES

export async function getStylistsWithServices() {
  const stylists = await getAllStylists();
  
  const stylistsWithServices = await Promise.all(
    stylists.map(async (stylist) => {
      const stylistServicesData = await getStylistServices(stylist.id);
      const serviceNames = stylistServicesData.map(s => s.service.name);
      const specialty = serviceNames.length > 0 ? serviceNames.join(', ') : 'General Stylist';
      
      return {
        ...stylist,
        specialty,
        services: stylistServicesData.map(s => s.service)
      };
    })
  );

  return stylistsWithServices;
}


// UPDATE USERS

export async function updateUser(
  id: string,
  data: Partial<{
    full_name?: string;
    age?: number;
    photo_url?: string;
    phone?: string;
    notes?: string;
  }>
) {
  const [updated] = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
  return updated;
}

export async function updatePassword(id: string, newPasswordHash: string) {
  const [updated] = await db
    .update(users)
    .set({ password_hash: newPasswordHash, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
  return updated;
}


// DELETE USER

export async function deleteUser(id: string) {
  const [deleted] = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return deleted;
}
