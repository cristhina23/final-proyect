import {
  pgTable,
  integer,
  varchar,
  text,
  numeric,
  timestamp,
  boolean,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";


// ENUMS

export const UserRole = pgEnum("user_role", ["ADMIN", "STYLIST", "CLIENT"]);
export const AuthProvider = pgEnum("auth_provider", ["EMAIL", "GOOGLE"]);
export const AppointmentStatus = pgEnum("appointment_status", [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "RESCHEDULED",
]);


// USERS TABLE

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }),
  auth_provider: AuthProvider("auth_provider").default("EMAIL").notNull(),
  role: UserRole("role").default("CLIENT").notNull(),
  full_name: varchar("full_name", { length: 255 }),
  years_of_experience: integer("years_of_experience"),
  age: integer("age"),
  photo_url: varchar("photo_url", { length: 512 }),
  phone: varchar("phone", { length: 20 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// SERVICES

export const services = pgTable("services", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  duration_minutes: integer("duration_minutes").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// STYLIST SERVICES

export const stylist_services = pgTable("stylist_services", {
  stylist_id: integer("stylist_id").notNull().references(() => users.id),
  service_id: integer("service_id").notNull().references(() => services.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.stylist_id, table.service_id] }),
}));


// SALON HOURS

export const salon_hours = pgTable("salon_hours", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  day_of_week: integer("day_of_week").notNull(), // 0=Domingo ... 6=Sábado
  open_time: varchar("open_time", { length: 5 }).notNull(),
  close_time: varchar("close_time", { length: 5 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// STYLIST AVAILABILITY

export const stylist_availability = pgTable("stylist_availability", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  stylist_id: integer("stylist_id").notNull().references(() => users.id),
  day_of_week: integer("day_of_week").notNull(),
  start_time: varchar("start_time", { length: 5 }).notNull(),
  end_time: varchar("end_time", { length: 5 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// STYLIST TIME OFF

export const stylist_time_off = pgTable("stylist_time_off", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  stylist_id: integer("stylist_id").notNull().references(() => users.id),
  date: timestamp("date").notNull(),
  start_time: varchar("start_time", { length: 5 }),
  end_time: varchar("end_time", { length: 5 }),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// APPOINTMENTS

export const appointments = pgTable("appointments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  client_id: integer("client_id").notNull().references(() => users.id),
  stylist_id: integer("stylist_id").references(() => users.id),
  start_time: timestamp("start_time").notNull(),
  end_time: timestamp("end_time").notNull(),
  status: AppointmentStatus("status").default("PENDING").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// APPOINTMENT ITEMS (Servicios + Extras)

export const appointment_items = pgTable("appointment_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  appointment_id: integer("appointment_id").notNull().references(() => appointments.id),
  service_id: integer("service_id").references(() => services.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  duration_snapshot: integer("duration_snapshot"),
  price_snapshot: numeric("price_snapshot", { precision: 10, scale: 2 }),
  is_extra: boolean("is_extra").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// REVIEWS

export const reviews = pgTable("reviews", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  appointment_id: integer("appointment_id").notNull().references(() => appointments.id),
  client_id: integer("client_id").notNull().references(() => users.id),
  stylist_id: integer("stylist_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// CLIENT PREFERENCES

export const client_preferences = pgTable("client_preferences", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  client_id: integer("client_id").notNull().references(() => users.id),
  preference_key: varchar("preference_key", { length: 50 }).notNull(),
  preference_value: varchar("preference_value", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
