create table follow (
  follower_id serial not null,
  followee_id serial not null,
  created_at timestamp default now(),
  foreign key(follower_id) references user(id),
  foreign key(followee_id) references user(id),
  primary key(follower_id, followee_id)
);
