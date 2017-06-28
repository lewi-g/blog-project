'use strict';

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require ('./model');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

// add some posts
BlogPosts.create('title', 'content', 'author', 'publishdate');
BlogPosts.create('Atlas Shrugged', 'virtues of selfishness etc....', 'Ayn Rand', '2, 4, 1949');

app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

app.post('/blog-posts', jsonParser, (req, res) => {
  // ensure `title`, 'content', 'author',`published date` are in request body
  const requiredFields = ['title', 'content', 'author','publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
