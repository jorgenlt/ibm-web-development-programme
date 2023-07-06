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

// Requests targeting all articles
app.route('/articles')
  .get((req, res) => {
    Article.find()
    .then(foundArticles => {
      res.send(foundArticles);
    })
    .catch(error => {
      console.log(error);
    })
  })
  .post((req, res) => {
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
  })
  .delete((req, res) => {
    Article.deleteMany()
      .then(() => {
        res.send('All articles deleted.');
      })
      .catch(error => {
        res.send(error);
      })
  })

// Requests targeting a specific article
app.route('/articles/:articleTitle')
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle })
      .then(foundArticle => {
        if (foundArticle) {
          res.send(foundArticle)
        } else {
          res.send('Could not find article.')
        }
      });
  })
  .put((req, res) => {
    Article.replaceOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true }
    )
    .then(() => {
      res.send('Successfully updated article.')
    })
  })

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
