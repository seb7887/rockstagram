create table user (
  id serial primary key,
  name varchar(255) unique not null,
  email text unique not null,
  created_at timestamp default now()
);
