const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true });


const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model('Article', articleSchema);

app.get('/articles', (req, res) => {
  Article.find()
  .then(foundArticles => {
    res.send(foundArticles);
  })
  .catch(error => {
    console.log(error);
  })
});

app.post('/articles', (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save()
    .then(() => {
      res.send('New article created.')
    })
    .catch(error => {
      res.send(error)
    })
});

app.delete('/articles', (req, res) => {
  Article.deleteMany()
    .then(() => {
      res.send('All articles deleted.');
    })
    .catch(error => {
      res.send(error);
    })
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
