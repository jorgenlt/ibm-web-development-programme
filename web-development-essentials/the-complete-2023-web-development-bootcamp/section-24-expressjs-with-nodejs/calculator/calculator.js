const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  
  const result = num1 + num2;
  
  res.send(`<h2>The result is ${result}.</h2>`);
});

app.get('/bmi', (req, res) => {
  res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmi', (req, res) => {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);

  const bmi = (weight / height / height) * 10000;

  res.send(`<h2>Your BMI is ${Math.round(bmi)}.</h2>`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});

