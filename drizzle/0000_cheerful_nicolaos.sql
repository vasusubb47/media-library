CREATE TABLE IF NOT EXISTS "media-library_album" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media-library_folder" (
	"id" uuid PRIMARY KEY NOT NULL,
	"album_id" uuid,
	"folder_id" uuid,
	"name" varchar(256) NOT NULL,
	"description" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media-library_media" (
	"id" uuid PRIMARY KEY NOT NULL,
	"folder_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"location" varchar(256) NOT NULL,
	"media_type" varchar(256) NOT NULL,
	"mediaVisibility" varchar(256) NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media-library_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media-library_user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"middle_name" varchar(256),
	"last_name" varchar(256) NOT NULL,
	"email_name" varchar(256) NOT NULL,
	"date_of_birth" date NOT NULL,
	"passcode_hash" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "media-library_user_email_name_unique" UNIQUE("email_name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media-library_album" ADD CONSTRAINT "media-library_album_user_id_media-library_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."media-library_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media-library_folder" ADD CONSTRAINT "media-library_folder_album_id_media-library_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."media-library_album"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media-library_media" ADD CONSTRAINT "media-library_media_folder_id_media-library_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."media-library_folder"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media-library_media" ADD CONSTRAINT "media-library_media_user_id_media-library_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."media-library_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "media-library_post" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "media-library_user" ("email_name");