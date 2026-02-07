export type ServiceStatus = "ACTIVE" | "INACTIVE";

export type Service = {
  id: number;
  name: string;
  description?: string | null;
  duration_minutes: number;
  price: number;  
  category: string;        
  status?: ServiceStatus; 
  createdAt?: Date;
  updatedAt?: Date;
};

export type ServiceForm = {
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  is_active?: boolean;
};
