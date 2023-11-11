-- Create a database called repli_reservation and run the following commands to create tables
-- TODO: Create universal mock data as INSERT INTO statements
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR,
    "is_temp" BOOLEAN DEFAULT FALSE
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
    "event_date" DATE,
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
    "user_id" INT UNIQUE REFERENCES "user"(id),
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(16) DEFAULT NULL,
    "street_address" VARCHAR(200),
    "unit" VARCHAR(10),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "zip" INT,
    "allergies" VARCHAR(500),
    "accommodations" VARCHAR(1000)
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
    "guest_id" INT REFERENCES "guest_info"(user_id),
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

-- Unclear how helpful this is going to be yet, had a CHAT with a little birdy and got some help....

INSERT INTO "user" ("username", "password", "is_temp")
VALUES
    ('maria.smith@example.com', 'password2', false),
    ('raj.patel@example.com', 'password3', false),
    ('emily.jones@example.com', 'password4', false),
    ('amy.jackson@example.com', 'password5', false),
    ('juan.rodriguez@example.com', 'password6', true),
    ('anika.singh@example.com', 'password7', true),
    ('adam.miller@example.com', 'password8', true),
    ('olivia.anderson@example.com', 'password9', false),
    ('chris.wilson@example.com', 'password10', false),
    ('jasmine.patel@example.com', 'password11', false),
    ('mohammed.ali@example.com', 'password12', false),
    ('sophia.kim@example.com', 'password13', false),
    ('carlos.gonzalez@example.com', 'password14', true),
    ('leila.ali@example.com', 'password15', false),
    ('luca.martinez@example.com', 'password16', false),
    ('nina.gupta@example.com', 'password17', false),
    ('antonio.rivera@example.com', 'password18', false),
    ('sara.lee@example.com', 'password19', false),
    ('will.harris@example.com', 'password20', false),
    ('jordan.smith@example.com','password21',true);


INSERT INTO "guest_info" ("user_id", "first_name", "last_name", "phone_number", "street_address", "unit", "city", "state", "zip", "allergies", "accommodations")
VALUES
    (1, 'Maria', 'Smith', '987-654-3210', '789 Oak St', 'Suite 201', 'St. Paul', 'Minnesota', 55101, 'None', 'None'),
    (2, 'Raj', 'Patel', '111-222-3333', '654 Cedar St', 'Apt 102', 'Minneapolis', 'Minnesota', 55402, 'None', 'None'),
    (3, 'Emily', 'Jones', '444-555-6666', '987 Elm St', 'Unit 501', 'St. Paul', 'Minnesota', 55102, 'Gluten', 'Sign language interpreter needed'),
    (4, 'Amy', 'Jackson', '555-123-4567', '321 Cedar St', 'Apt 102', 'Minneapolis', 'Minnesota', 55402, 'None', 'None'),
    (5, 'Juan', 'Rodriguez', '555-234-5678', '654 Pine St', 'Unit 201', 'St. Paul', 'Minnesota', 55101, 'None', 'None'),
    (6, 'Anika', 'Singh', '555-345-6789', '987 Elm St', 'Suite 301', 'Minneapolis', 'Minnesota', 55403, 'Shellfish', 'Service animal required'),
    (7, 'Adam', 'Miller', '555-456-7890', '123 Oak St', 'Apt 401', 'St. Paul', 'Minnesota', 55102, 'None', 'None'),
    (8, 'Olivia', 'Anderson', '555-567-8901', '456 Maple St', 'Apt 501', 'Minneapolis', 'Minnesota', 55401, 'None', 'None'),
    (9, 'Chris', 'Wilson', '555-678-9012', '789 Cedar St', 'Suite 601', 'St. Paul', 'Minnesota', 55101, 'None', 'None'),
    (10, 'Jasmine', 'Patel', '555-789-0123', '321 Pine St', 'Unit 701', 'Minneapolis', 'Minnesota', 55402, 'None', 'Wheelchair access needed'),
    (11, 'Mohammed', 'Ali', '555-890-1234', '654 Elm St', 'Suite 801', 'St. Paul', 'Minnesota', 55102, 'None', 'None'),
    (12, 'Sophia', 'Kim', '555-901-2345', '987 Oak St', 'Apt 901', 'Minneapolis', 'Minnesota', 55403, 'None', 'None'),
    (13, 'Carlos', 'Gonzalez', '555-012-3456', '123 Maple St', 'Unit 1001', 'St. Paul', 'Minnesota', 55101, 'None', 'None'),
    (14, 'Leila', 'Ali', '555-112-2334', '456 Cedar St', 'Suite 1101', 'Minneapolis', 'Minnesota', 55401, 'None', 'None'),
    (15, 'Luca', 'Martinez', '555-334-4556', '789 Pine St', 'Apt 1201', 'St. Paul', 'Minnesota', 55102, 'Shellfish', 'None'),
    (16, 'Nina', 'Gupta', '555-556-6778', '321 Elm St', 'Unit 1301', 'Minneapolis', 'Minnesota', 55402, 'None', 'None'),
    (17, 'Antonio', 'Rivera', '555-778-8990', '654 Oak St', 'Suite 1401', 'St. Paul', 'Minnesota', 55101, 'None', 'None'),
    (18, 'Sara', 'Lee', '555-990-1122', '987 Maple St', 'Apt 1501', 'Minneapolis', 'Minnesota', 55403, 'Peanuts', 'None'),
    (19, 'Will', 'Harris', '555-122-3344', '123 Cedar St', 'Unit 1601', 'St. Paul', 'Minnesota', 55102, 'None', 'None'),
    (20, 'Jordan', 'Smith', '555-334-4556', '789 Pine St', 'Apt 1201', 'St. Paul', 'Minnesota', 55102, 'None', 'None');

INSERT INTO "wedding" ("wedding_photo", "wedding_blurb", "wedding_title", "wedding_date", "wedding_creator_id", "spouse_1", "spouse_2")
VALUES
    ('https://images.pexels.com/photos/1082024/pexels-photo-1082024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'A beautiful celebration of love.', 'Maria and Leilas Wedding', '2023-11-10', 1, 'Maria Smith', 'Leila Ali');

INSERT INTO "events" ("wedding_id", "event_broadcast", "event_name", "event_street_address", "event_city", "event_state", "event_zip", "event_maps_url", "event_date", "event_start_time", "event_end_time")
VALUES
    (1, true, 'Ceremony', '123 Wedding Way', 'Minneapolis', 'Minnesota', 55401, 'maps_url_ceremony', '2023-11-10', '14:00', '15:00'),
    (1, true, 'Reception', '456 Celebration St', 'St. Paul', 'Minnesota', 55102, 'maps_url_reception', '2023-11-10', '16:00', '20:00'),
    (1, true, 'Dinner', '789 Banquet Blvd', 'Minneapolis', 'Minnesota', 55403, 'maps_url_dinner', '2023-11-10', '21:00', '23:00'),
    (1, false, 'Dance Party', '101 Dancing Dr', 'St. Paul', 'Minnesota', 55101, 'maps_url_dance', '2023-11-11', '19:00', '23:00'),
    (1, false, 'Brunch', '202 Brunch Blvd', 'Minneapolis', 'Minnesota', 55402, 'maps_url_brunch', '2023-11-12', '10:00', '12:00'),
    (1, false, 'Game Night', '303 Game St', 'St. Paul', 'Minnesota', 55102, 'maps_url_game_night', '2023-11-12', '18:00', '22:00'),
    (1, false, 'Movie Night', '404 Movie Dr', 'Minneapolis', 'Minnesota', 55403, 'maps_url_movie_night', '2023-11-13', '19:30', '22:30'),
    (1, false, 'Farewell Brunch', '505 Farewell Blvd', 'St. Paul', 'Minnesota', 55101, 'maps_url_farewell_brunch', '2023-11-14', '10:30', '12:30');

INSERT INTO "meal_options" ("wedding_id", "meal_name", "meal_description")
VALUES
    (1, 'Vegetarian Delight', 'A selection of delicious vegetarian dishes.'),
    (1, 'Classic Chicken Feast', 'Savory chicken dishes prepared to perfection.'),
    (1, 'Seafood Extravaganza', 'An assortment of delectable seafood.'),
    (1, 'Hearty Beef Platter', 'Satisfying beef dishes for meat lovers.');




INSERT INTO "relationship" ("category") VALUES
    ('Family'),
    ('Friend'),
    ('Family Friend'),
    ('Wedding Party');

INSERT INTO "plus_one" ("first_name", "last_name", "meal_id", "notes") VALUES
    ('Elena', 'Williams', 1, 'Outgoing personality'),
    ('Aiden', 'Thompson', 2, 'Loves to dance'),
    ('Sophie', 'Miller', 3, 'Adventurous spirit'),
    ('Zayn', 'Johnson', 4, 'Enjoys outdoor activities'),
    ('Mia', 'Brown', 1, 'Art and music enthusiast'),
    ('Elijah', 'Taylor', 3, 'Tech geek'),
    ('Lily', 'Anderson', 2, 'Foodie');


INSERT INTO "guest_list_junction" ("wedding_id", "guest_id", "relationship", "spouse_association", "can_plus_one", "plus_one_id", "meal_id") VALUES
    (1, 1, 1, NULL, false, NULL, 1),
    (1, 2, 2, NULL, false, NULL, 2),
    (1, 3, 3, NULL, true, 1, 3),
    (1, 4, 2, NULL, true, 2, 4),
    (1, 5, 2, NULL, false, NULL, 2),
    (1, 6, 3, NULL, false, NULL, 3),
    (1, 7, 2, NULL, false, NULL, 2),
    (1, 8, 2, NULL, false, NULL, 1),
    (1, 9, 1, NULL, false, NULL, 3),
    (1, 10, 1, NULL, true, 3, NULL),
    (1, 11, 2, NULL, false, NULL, NULL),
    (1, 12, 3, NULL, false, NULL, NULL),
    (1, 13, 2, NULL, false, NULL, NULL),
    (1, 14, 1, NULL, true, 4, NULL),
    (1, 15, 1, NULL, false, NULL, NULL),
    (1, 16, 2, NULL, false, NULL, NULL),
    (1, 17, 2, NULL, false, 7, NULL),
    (1, 18, 3, NULL, true, 5, NULL),
    (1, 19, 2, NULL, false, NULL, NULL),
    (1, 20, 2, NULL, true, 6, NULL);


INSERT INTO "event_attendees_junction" ("guest_id", "wedding_id", "event_id", "is_attending") VALUES
    (1, 1, 1, NULL),
    (2, 1, 2, NULL),
    (3, 1, 3, NULL),
    (4, 1, 4, NULL),
    (5, 1, 5, NULL),
    (6, 1, 6, NULL),
    (7, 1, 7, NULL),
    (8, 1, 8, NULL),
    (9, 1, 1, NULL),
    (10, 1, 2, NULL),
    (11, 1, 3, NULL),
    (12, 1, 4, NULL),
    (13, 1, 5, NULL),
    (14, 1, 6, NULL),
    (15, 1, 7, NULL),
    (16, 1, 8, NULL),
    (17, 1, 1, NULL),
    (18, 1, 2, NULL),
    (19, 1, 3, NULL),
    (20, 1, 4, NULL);


INSERT INTO "wedding_announcements" ("creator_id", "wedding_id", "event_id", "announcement") VALUES
    (1, 1, 1, 'Excited to announce our wedding ceremony! Save the date!'),
    (1, 1, 2, 'Join us for the joyous reception celebration after the ceremony!'),
    (1, 1, 3, 'Dinner is served! Lets enjoy a delicious meal together!'),
    (1, 1, 4, 'Get ready to dance the night away at the Dance Party event!'),
    (1, 1, 5, 'Sunday Brunch: Relax, mingle, and enjoy a delightful brunch with us!'),
    (1, 1, 6, 'Art and Music Festival: Join us for a celebration of creativity and harmony!'),
    (1, 1, 7, 'Tech Geek Symposium: For all tech enthusiasts, come together for a tech-filled evening!'),
    (1, 1, 8, 'Farewell Gathering: Join us for a casual farewell as we embark on our new journey!');

