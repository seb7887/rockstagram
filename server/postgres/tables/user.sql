create table user (
  id serial primary key,
  username varchar(255) unique not null,
  email text unique not null,
  created_at timestamp default now()
);
