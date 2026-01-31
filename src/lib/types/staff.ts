export type Employee = {
  id: string;
  name: string;
  email: string;
  role: "STYLIST";
  avatar?: string;
  status: "active" | "inactive";
};