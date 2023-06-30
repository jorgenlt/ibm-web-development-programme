const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  // fetch data from pokeapi
  const query = req.body.pokemon;
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
  https.get(url, response => {
    console.log(response.statusCode);
  
    let data = '';
  
    // response comes back in chunks. Concatonate in variable data.
    response.on('data', chunk => {
      data += chunk;
    });
  
    response.on('end', () => {
      const pokeData = JSON.parse(data);
      const name = pokeData.forms[0].name;
      const ability = pokeData.abilities[0].ability.name;
      res.write(`<h1>The Pokemon's name is ${name}.</h1>`);
      res.write(`<h1>Ability: ${ability}</h1>`)
      res.send();
    });
  });
})




app.listen(3000, () => {
  console.log('The server is running on port 3000.');
});