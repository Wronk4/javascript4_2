'use strict';

const express = require('express');
const app = express();
app.use(express.json());

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Dlaczego komputer poszedł do lekarza?',
    'response': 'Bo złapał wirusa!'
  },
  {
    'joke': 'Dlaczego komputer nie może być głodny?',
    'response': 'Bo ma pełen dysk!'
  },
  {
    'joke': 'Co mówi jeden bit do drugiego?',
    'response': '„Trzymaj się, zaraz się przestawiamy!”'
  }
];
let lameJoke = [
  {
    'joke': 'Dlaczego programiści preferują noc?',
    'response': 'Bo w nocy jest mniej bugów do łapania!'
  },
  {
    'joke': 'Jak nazywa się bardzo szybki programista?',
    'response': 'Błyskawiczny kompilator!'
  }
];

app.get('/jokebook/categories', (req, res) => {
  res.json(categories);
});

app.get('/jokebook/joke/:category', (req, res) => {
  const category = req.params.category;
  const jokeLists = {
    'funnyJoke': funnyJoke,
    'lameJoke': lameJoke
  };

  if (categories.includes(category)) {
    const list = jokeLists[category];
    const randomJoke = list[Math.floor(Math.random() * list.length)];
    res.json(randomJoke);
  } else {
    res.json({ 'error': `no jokes for category ${category}` });
  }
});

app.post('/jokebook/joke/:category', (req, res) => {
  const category = req.params.category;
  const { joke, response } = req.body || {};
  const jokeLists = {
    'funnyJoke': funnyJoke,
    'lameJoke': lameJoke
  };
console.log(req.body)
  if (categories.includes(category)) {
    if (joke && response) {
      jokeLists[category].push({ joke, response });
      res.json("success");
    } else {
      res.status(400).json({ error: 'invalid body format' });
    }
  } else {
    res.json({ 'error': `no jokes for category ${category}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});