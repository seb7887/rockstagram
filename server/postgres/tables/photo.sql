create table photo (
  id serial primary key,
  image_url varchar(255) not null,
  caption varchar(255),
  user_id serial not null,
  created_at timestamp default now()
  foreign key(user_id) references user(id)
);
