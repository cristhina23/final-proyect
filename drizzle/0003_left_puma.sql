ALTER TABLE "users" ADD COLUMN "invitation_token" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "invitation_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;