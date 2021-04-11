DROP SCHEMA IF EXISTS waw;
CREATE SCHEMA IF NOT EXISTS waw;

CREATE TABLE IF NOT EXISTS waw.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  bio TEXT,
  email VARCHAR(250) NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  zipcode VARCHAR(15) NOT NULL,
  city VARCHAR(255) NOT NULL,
  searched_as VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS waw.dogs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  bio TEXT,
  hypo BOOLEAN NOT NULL,
  neutered BOOLEAN NOT NULL,
  rating INT NOT NULL,
  owner_id INT NOT NULL,
  age INT NOT NULL,
  size VARCHAR(5) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  healthy BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS waw.photos (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  dog_id INT,
  url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS waw.profileLikes (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  liked_user_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS waw.notifications (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  type_id INT NOT NULL,
  time_stamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  sender_id INT NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  recipient_id INT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS waw.photoLikes (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  photo_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS waw.convo (
  id SERIAL PRIMARY KEY,
  user1 INT NOT NULL,
  user2 INT NOT NULL
);

CREATE TABLE IF NOT EXISTS waw.message (
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL,
  body TEXT NOT NULL,
  time_stamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  convo_id INT NOT NULL,
  opened BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS waw.filters (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  min_size VARCHAR(5) NOT NULL,
  max_size VARCHAR(5) NOT NULL,
  dog_min_age INT NOT NULL,
  dog_max_age INT NOT NULL,
  dog_genders VARCHAR(20) NOT NULL,
  hypo BOOLEAN NOT NULL,
  neutered BOOLEAN NOT NULL,
  health_issues BOOLEAN NOT NULL,
  avoid_breeds TEXT,
  favorite_breeds TEXT,
  max_dist INT NOT NULL,
  genders VARCHAR(20) NOT NULL,
  min_age INT NOT NULL,
  max_age INT NOT NULL
);

CREATE TABLE IF NOT EXISTS waw.userSchedule (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  dates TIMESTAMPTZ NOT NULL,
  selected BOOLEAN
);

CREATE TABLE IF NOT EXISTS waw.userAppointment (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  user_id2 INT NOT NULL,
  schedule_id INT NOT NULL,
  reviewed BOOLEAN
);