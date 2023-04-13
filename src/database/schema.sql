CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories(
   id uuid NOT NULL UNIQUE DEFAULT public.uuid_generate_v4(),
  "name" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts(
   id uuid NOT NULL UNIQUE DEFAULT public.uuid_generate_v4(),
  "name" VARCHAR NOT NULL,
  "email" VARCHAR NOT NULL UNIQUE,
  "phone" VARCHAR,
  category_id UUID,
  FOREIGN KEY(category_id) REFERENCES categories(id)

);
