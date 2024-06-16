ALTER TABLE "media-library_folder" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media-library_folder" ADD CONSTRAINT "media-library_folder_user_id_media-library_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."media-library_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
