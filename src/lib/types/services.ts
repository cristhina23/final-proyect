export type ServiceStatus = "ACTIVE" | "INACTIVE";

export type Category = {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  createdAt?: string | Date;
}

export type Service = {
  id: number;
  name: string;
  description: string;
  duration_minutes: number;
  price: number | string;  
  category_id: number;
  is_active: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type ServiceForm = {
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  category_id: number;
  is_active?: boolean;
};
