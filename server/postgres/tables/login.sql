create table login (
  id serial primary key,
  hash varchar(255) not null,
  email text not null
);
