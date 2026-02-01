CREATE TYPE "public"."appointment_status" AS ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED');--> statement-breakpoint
CREATE TYPE "public"."auth_provider" AS ENUM('EMAIL', 'GOOGLE');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'STYLIST', 'CLIENT');--> statement-breakpoint
CREATE TABLE "appointment_items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "appointment_items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"appointment_id" integer NOT NULL,
	"service_id" integer,
	"name" varchar(255) NOT NULL,
	"description" text,
	"duration_snapshot" integer,
	"price_snapshot" numeric(10, 2),
	"is_extra" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "appointments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"client_id" integer NOT NULL,
	"stylist_id" integer,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"status" "appointment_status" DEFAULT 'PENDING' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_preferences" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "client_preferences_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"client_id" integer NOT NULL,
	"preference_key" varchar(50) NOT NULL,
	"preference_value" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reviews_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"appointment_id" integer NOT NULL,
	"client_id" integer NOT NULL,
	"stylist_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "salon_hours" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "salon_hours_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"day_of_week" integer NOT NULL,
	"open_time" varchar(5) NOT NULL,
	"close_time" varchar(5) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"duration_minutes" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"category" varchar(50) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stylist_availability" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stylist_availability_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stylist_id" integer NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" varchar(5) NOT NULL,
	"end_time" varchar(5) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stylist_services" (
	"stylist_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "stylist_services_stylist_id_service_id_pk" PRIMARY KEY("stylist_id","service_id")
);
--> statement-breakpoint
CREATE TABLE "stylist_time_off" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stylist_time_off_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stylist_id" integer NOT NULL,
	"date" timestamp NOT NULL,
	"start_time" varchar(5),
	"end_time" varchar(5),
	"reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"auth_provider" "auth_provider" DEFAULT 'EMAIL' NOT NULL,
	"role" "user_role" DEFAULT 'CLIENT' NOT NULL,
	"full_name" varchar(255),
	"years_of_experience" integer,
	"age" integer,
	"photo_url" varchar(512),
	"phone" varchar(20),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
ALTER TABLE "appointment_items" ADD CONSTRAINT "appointment_items_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment_items" ADD CONSTRAINT "appointment_items_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_stylist_id_users_id_fk" FOREIGN KEY ("stylist_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_preferences" ADD CONSTRAINT "client_preferences_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_stylist_id_users_id_fk" FOREIGN KEY ("stylist_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stylist_availability" ADD CONSTRAINT "stylist_availability_stylist_id_users_id_fk" FOREIGN KEY ("stylist_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stylist_services" ADD CONSTRAINT "stylist_services_stylist_id_users_id_fk" FOREIGN KEY ("stylist_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stylist_services" ADD CONSTRAINT "stylist_services_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stylist_time_off" ADD CONSTRAINT "stylist_time_off_stylist_id_users_id_fk" FOREIGN KEY ("stylist_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;