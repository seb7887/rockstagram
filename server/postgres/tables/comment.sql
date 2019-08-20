create table comment(
  id serial primary key,
  comment_text varchar(255) not null,
  user_id serial not null,
  photo_id serial not null,
  created_at timestamp default now(),
  foreign key(user_id) references user(id),
  foreign key(photo_id) references photo(id)
);