const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
  name: 'Apple',
  rating: 7,
  review: 'Tastes good.'
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: 'Jorgen',
  age: 34
});

person.save();

const kiwi = new Fruit({
  name: 'kiwi',
  rating: 9,
  review: 'Fine.'
});

const banana = new Fruit({
  name: 'banana',
  rating: 5,
  review: 'ok.'
});

const orange = new Fruit({
  name: 'orange',
  rating: 1,
  review: 'bad.'
})

Fruit.insertMany([kiwi, banana, orange]);
