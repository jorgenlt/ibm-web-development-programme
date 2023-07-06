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
          res.send(foundArticle);
        } else {
          res.status(404).send('Article not found.');
        }
      })
      .catch(error => {
        res.status(500).send('Error occurred while finding article.');
      });
  })
  .put((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body }
    )
      .then(result => {
        if (result.nModified === 0) {
          res.send('No changes made to the article.');
        } else {
          res.send('Successfully updated article.');
        }
      })
      .catch(error => {
        res.status(500).send('Error occurred while updating article.');
      });
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body }
    )
      .then(result => {
        if (result.nModified === 0) {
          res.send('No changes made to the article.');
        } else {
          res.send('Successfully updated article.');
        }
      })
      .catch(error => {
        res.status(500).send('Error occurred while updating article.');
      });
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle })
      .then(result => {
        if (result.deletedCount === 0) {
          res.send('Article not found.')
        } else {
          res.send('Successfully deleted article.')
        }
      })
      .catch(error => {
        res.status(500).send('An error occured while deleting article.')
      })
  })

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
