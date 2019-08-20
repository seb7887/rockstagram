create table like (
  user_id serial not null,
  photo_id serial not null,
  created_at timestamp default now(),
  foreign key(user_id) references user(id),
  foreign key(photo_id) references photo(id),
  primary key(user_id, photo_id)
);
