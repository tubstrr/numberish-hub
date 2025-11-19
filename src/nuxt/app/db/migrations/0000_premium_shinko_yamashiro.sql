CREATE TABLE "messages" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"hash" varchar(1024),
	"created_at" bigint,
	"message" varchar(1024),
	"encrypted" varchar(1024),
	"method" varchar(1024)
);
