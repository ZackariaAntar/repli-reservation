-- Create a database called repli_reservation and run the following commands to create tables
-- TODO: Create universal mock data as INSERT INTO statements
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR,
    "isTemp" BOOLEAN DEFAULT FALSE
);
CREATE TABLE "wedding" (
    "id" SERIAL PRIMARY KEY,
    "wedding_photo" VARCHAR(2500),
    "wedding_blurb" VARCHAR(5000),
    "wedding_title" VARCHAR(200),
    "wedding_date" DATE,
    "wedding_creator_id" INT REFERENCES "user"(id),
    "spouse_1" VARCHAR(100),
    "spouse_2" VARCHAR(100)
);
CREATE TABLE "events" (
    "id" SERIAL PRIMARY KEY,
    "wedding_id" INT REFERENCES "wedding"(id),
    "event_broadcast" BOOLEAN,
    "event_name" VARCHAR(200),
    "event_street_address" VARCHAR(200),
    "event_city" VARCHAR(100),
    "event_state" VARCHAR(100),
    "event_zip" INT,
    "event_maps_url" VARCHAR(2500),
    "event_start_time" TIME,
    "event_end_time" TIME
);
CREATE TABLE "meal_options" (
    "id" SERIAL PRIMARY KEY,
    "wedding_id" INT REFERENCES "wedding"(id),
    "meal_name" VARCHAR(200),
    "meal_description" VARCHAR(1000)
);
CREATE TABLE "relationship" (
    "id" SERIAL PRIMARY KEY,
    "category" VARCHAR
);
CREATE TABLE "guest_info" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"(id),
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(16) DEFAULT NULL,
    "street_address" VARCHAR(200),
    "unit" VARCHAR(10),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "zip" INT,
    "allergies" VARCHAR(500),
    "accomodations" VARCHAR(1000)
);
CREATE TABLE "plus_one" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "meal_id" INT REFERENCES "meal_options"(id),
    "notes" VARCHAR(1000)
);
CREATE TABLE "guest_list_junction" (
    "id" SERIAL PRIMARY KEY,
    "wedding_id" INT REFERENCES "wedding"(id),
    "guest_id" INT REFERENCES "guest_info"(id),
    "relationship" INT REFERENCES "relationship"(id),
    "spouse_association" VARCHAR,
    "can_plus_one" BOOLEAN,
    "plus_one_id" INT REFERENCES "plus_one"(id) DEFAULT NULL,
    "meal_id" INT REFERENCES "meal_options"(id) DEFAULT NULL
);
CREATE TABLE "event_attendees_junction" (
    "id" SERIAL PRIMARY KEY,
    "guest_id" INT REFERENCES "guest_info"(id),
    "wedding_id" INT REFERENCES "wedding"(id),
    "event_id" INT REFERENCES "events"(id),
    "is_attending" BOOLEAN DEFAULT NULL
);
CREATE TABLE "wedding_announcements" (
    "id" SERIAL PRIMARY KEY,
    "creator_id" INT REFERENCES "user"(id),
    "wedding_id" INT REFERENCES "wedding"(id),
    "event_id" INT REFERENCES "events"(id),
    "announcement" VARCHAR(5000)
);
-- KEEPING THIS HERE AS A REFERENCE FOR IF/WHEN WE INCORPORATE IT TO THE PROJECT
-- CREATE TABLE "wedding_seating_chart" (
--     "id" SERIAL PRIMARY KEY,
--     "wedding_id" INT REFERENCES "wedding"(id),
--     "guest_id" INT REFERENCES "guest_info"(id),
--     "table_number" INT,
--     "seat_assignment" INT
-- );


