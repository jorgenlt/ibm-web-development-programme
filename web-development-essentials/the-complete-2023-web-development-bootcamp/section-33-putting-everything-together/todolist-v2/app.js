// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

// Create an instance of the Express application
const app = express();

// Set the view engine to use EJS templates
app.set('view engine', 'ejs');

// Configure middleware for parsing request bodies
app.use(bodyParser.urlencoded({extended: true}));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

// Define the schema for individual items
const itemsSchema = {
  name: String
};

// Create a model based on the items schema
const Item = mongoose.model("Item", itemsSchema);

// Create default items to be added to the database
const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

// Define the schema for lists
const listSchema = {
  name: String,
  items: [itemsSchema]
};

// Create a model based on the list schema
const List = mongoose.model("List", listSchema);

// Handle GET requests to the root route
app.get("/", (req, res) => {

  // Find all items in the database
  Item.find()
    .then(foundItems => {
      if (foundItems.length === 0) {
        // If no items are found, insert the default items into the database
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Successfully saved default items to DB.");
            res.redirect("/");
          });
      } else {
        // If items are found, render the "list" view with the listTitle and newListItems parameters
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
    })
    .catch(error => {
      console.log(error);
    })
});

// Handle GET requests to a custom list route
app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  // Find a list with the specified name in the database
  List.findOne({name: customListName})
    .then(foundList => {
      if (!foundList){
        // If no list is found, create a new list with the specified name and default items
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // If a list is found, render the "list" view with the listTitle and newListItems parameters
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }  
    })
    .catch(error => {
      console.log(error);
    })
});

// Handle POST requests to the root route
app.post("/", (req, res) => {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  // Create a new item based on the provided name
  const item = new Item({
    name: itemName
  });

  if (listName === "Today"){
    // If the list name is "Today", save the item and redirect to the root route
    item.save();
    res.redirect("/");
  } else {
    // If the list name is not "Today", find the corresponding list and add the item to its items array
    List.findOne({name: listName})
      .then(foundList => {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      });
  }
});

// Handle POST requests to delete an item
app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    // If the list name is "Today", find and delete the item with the specified ID
    Item.findByIdAndRemove(checkedItemId)
      .then(() => {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    // If the list name is not "Today", find the corresponding list and remove the item with the specified ID from its items array
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
      .then(() => {
        res.redirect("/" + listName);
      })
      .catch(error => {
        console.log(error);
      })
  }
});

// Handle GET requests to the "/about" route
app.get("/about", (req, res) => {
  res.render("about");
});

// Start the server to listen on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
