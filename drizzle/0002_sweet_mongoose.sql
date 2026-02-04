ALTER TABLE "appointments" ALTER COLUMN "client_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "stylist_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "client_preferences" ALTER COLUMN "client_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "client_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "stylist_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "stylist_availability" ALTER COLUMN "stylist_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "stylist_services" ALTER COLUMN "stylist_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "stylist_time_off" ALTER COLUMN "stylist_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP IDENTITY;