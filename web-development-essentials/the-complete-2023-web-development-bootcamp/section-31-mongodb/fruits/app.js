const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('fruitsDB');
    // const movies = database.collection('movies');

    // // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.findOne(query);

    // console.log(movie);

    insertDocuments(database)
  } finally {
    // Ensures that the client will close when you finish/error
    console.log('connected..............');
    await client.close();
  }
}

const insertDocuments = (db, callback) => {
  const collection = db.collection('fruits');
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Good"
    },
    {
      name: "Orange",
      score: 5,
      review: "Bad"
    }
  ],
  (err, result) => {
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    assert.equal(2, result.ops.length);
    console.log('inserted 2 documents into collection.');
    callback(result);
  } 
  )
}

run().catch(console.dir);