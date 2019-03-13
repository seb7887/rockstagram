create table tag (
  id serial primary key,
  tag_name varchar(255) unique,
  created_at timestamp default now()
);
