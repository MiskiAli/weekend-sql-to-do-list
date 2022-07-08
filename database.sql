CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"date" DATE,
	"time" TIME,
    "notes" VARCHAR (250) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "list"("task", "date", "time", "notes") VALUES
('homework', '07/03/2022', '06:00 PM', 'weekend assignment is due!'),
('code challenge', '07/05/2022', '09:00 AM', 'code challenge is due!');
