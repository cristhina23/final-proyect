/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserRole } from "$lib/server/db/schema";

export type Employee = {
  id: string;
  name: string;
  full_name?: string | null;
  email: string;
  role: UserRole;
  image?: string;
  photo_url?: string;
  status?: "active" | "inactive";
  specialty?: string;
  bio?: string;
  experience?: number;
  years_of_experience?: number;
  services?: any[];
};