import type { UserRole } from "$lib/server/db/schema";

export type Employee = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  status: "active" | "inactive";
  specialty?: string;
  bio?: string;
  experience?: number;
  services?: string[];
};