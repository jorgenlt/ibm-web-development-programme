// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// Define constants for different content sections
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare...";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque...";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra...";

// Initialize the Express app
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({extended: true}));

// Serve static files from the "public" folder
app.use(express.static("public"));

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

// Define the schema for a blog post
const postSchema = {
  title: String,
  content: String
};

// Create a model based on the schema
const Post = mongoose.model("Post", postSchema);

// Handle GET requests to the root path
app.get("/", (req, res) => {
  // Retrieve all posts from the database
  Post.find({})
    .then(posts => {
      // Render the home page with the retrieved posts
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    })
    .catch(error => {
      console.log(error);
    })
});

// Handle GET requests to the "/compose" path
app.get("/compose", (req, res) => {
  // Render the compose page
  res.render("compose");
});

// Handle POST requests to the "/compose" path
app.post("/compose", (req, res) => {
  // Create a new post using the data from the request body
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  // Save the post to the database
  post.save()
    .then(() => {
      // Redirect back to the home page after saving the post
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    })
});

// Handle GET requests to individual post pages
app.get("/posts/:postId", (req, res) => {
  // Retrieve the requested post based on the postId parameter
  const requestedPostId = req.params.postId;
    Post.findOne({_id: requestedPostId})
      .then(post => {
        // Render the post page with the retrieved post
        res.render("post", {
          title: post.title,
          content: post.content
        });
      })
      .catch(error => {
        console.log(error);
      })
});

// Handle GET requests to the "/about" path
app.get("/about", (req, res) => {
  // Render the about page with the aboutContent constant
  res.render("about", {aboutContent: aboutContent});
});

// Handle GET requests to the "/contact" path
app.get("/contact", (req, res) => {
  // Render the contact page with the contactContent constant
  res.render("contact", {contactContent: contactContent});
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
