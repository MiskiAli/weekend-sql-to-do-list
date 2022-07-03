CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"date" DATE,
	"time" TIME,
    "notes" VARCHAR (250) NOT NULL
);

