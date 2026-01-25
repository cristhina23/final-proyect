export type Employee = {
  id: string;
  name: string;
  email: string;
  role: "Stylist" | "Manager";
  avatar?: string;
  status: "active" | "inactive";
};