CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"phone" varchar(255)
);
--> statement-breakpoint
DROP TABLE "resources";--> statement-breakpoint
DROP TABLE "embeddings";