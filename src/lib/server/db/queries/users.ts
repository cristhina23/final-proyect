import { users } from "../schema";
import { db } from "../index";
import { eq } from "drizzle-orm";

//Create a new user
export async function createUser(data: {
  email: string;
  password_hash?: string;
  auth_provider?: 'EMAIL' | 'GOOGLE';
  role: 'ADMIN' | 'STYLIST' | 'CLIENT';
  full_name?: string;
  age?: number;
  photo_url?: string;
  phone?: string;
  notes?: string;
}) {
  const [user] = await db.insert(users).values(data).returning();
  return user;
}

//Get only stylists
export async function getAllStylists() {
  return await db.select().from(users).where(eq(users.role, 'STYLIST'));
}

//Read all users
export async function getAllUsers() {
  return await db.select().from(users).where(eq(users.role, 'CLIENT'));
}

//Get user by id
export async function getUserById(id: number) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

//Get user by email
export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

//update user 
export async function updateUser(id: number, data: Partial<{
  full_name?: string;
  age?: number;
  photo_url?: string;
  phone?: string;
  notes?: string;
}>) {
  const [updated] = await db.update(users)
  .set({...data, updatedAt: new Date()})
  .where(eq(users.id, id))
  .returning();
  return updated;
}

//update password
export async function updatePassword(id: number, newPasswordHash: string) {
  const [updated] = await db.update(users)
    .set({ password_hash: newPasswordHash, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
  return updated;
}

//delete user
export async function deleteUser(id: number) {
  const [deleted] = await db.delete(users)
  .where(eq(users.id, id))
  .returning();
  return deleted;
}