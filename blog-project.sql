CREATE TABLE users(
  id serial PRIMARY KEY,
  first_name text,
  last_name text,
  email_address text not null,
  screen_name text not null,
);

CREATE TABLE posts(
  id serial PRIMARY KEY,
  author_id integer REFERENCES users ON DELETE RESTRICT,
  title text,
  content text,
  published timestamp DEFAULT current_timestamp,
  -- comments integer,
  -- tags integer
);

CREATE TABLE comment(
  id serial PRIMARY KEY,
  author_id integer REFERENCES users ON DELETE RESTRICT,
  post_id integer REFERENCES posts,
  comment_text text not null
);

create table tags(
  id serial primary key,
  tag text not null
)

INSERT INTO tags (tag) VALUES 
  ('sand'), ('beach'), ('water');

INSERT into users (first_name, last_name, email_address, screen_name) VALUES
  ('BRUCE', 'Wayne', 'bruce@earthlink.net', 'brucey'),
  ('Robinson', 'Crusoe', 'robrob@where.net', 'lonely_island');

INSERT into posts (author_id, title, content) VALUES
  ('1', 'Code!!!', 'javascript is the best!!! and Thinkful rocks!')
  ('2', 'Food', 'I eats all the things! do you like Sushi?')
  RETURNING id;


