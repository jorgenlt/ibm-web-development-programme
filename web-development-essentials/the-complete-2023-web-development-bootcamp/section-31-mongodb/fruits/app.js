const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please type in a name.']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
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

// const kiwi = new Fruit({
//   name: 'kiwi',
//   rating: 9,
//   review: 'Fine.'
// });

// const banana = new Fruit({
//   name: 'banana',
//   rating: 5,
//   review: 'ok.'
// });

// const orange = new Fruit({
//   name: 'orange',
//   rating: 1,
//   review: 'bad.'
// })

// Fruit.insertMany([kiwi, banana, orange]);

// Fruit.find().exec()
//   .then(fruits => {
//     fruits.forEach(fruit => console.log(fruit.name));
//   })
//   .catch(error => {
//     console.log(error);
//   })

// const ObjectId = mongoose.Types.ObjectId;
// const fruitId = new ObjectId("64a3fe25332dd563de3a363e");

// Fruit.updateOne({ _id: fruitId }, { name: 'peach' })
//   .then(result => {
//     console.log('Update successfull.');
//   })
//   .catch(error => {
//     console.log(error);
//   });

// Fruit.deleteOne({ name: 'kiwi' })
//   .then(result => {
//     console.log('Item deleted.');
//   })
//   .catch(error => {
//     console.log(error);
//   });



