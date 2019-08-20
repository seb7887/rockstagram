create table photo_tag (
  photo_id serial not null,
  tag_id serial not null,
  foreign key(photo_id) references photo(id),
  foreign key(tag_id) references tag(id),
  primary key(photo_id, tag_id)
);