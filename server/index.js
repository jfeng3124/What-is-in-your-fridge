const express = require('express');
const bodyParser = require('body-parser');
const { createList, findList, createRecipeList, deleteIngredient } = require('../database/controller');
const path = require('path');
const axios = require('axios');
const key = require('../config.js');
const List = require('../database/index');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.post('/api/ingredients', (req, res) => {
  const ingredients = req.body.ingredientNames.split(', ');
  createList({ ingredientNames: ingredients });
  res.send('Sent!');
});

app.get('/api/recipes', (req, res) => {
  findList(ingredients => {
    const ingredientList = ingredients[0].ingredientNames;
    let list = '';
    for (let i = 0; i < ingredientList.length; i++) {
      list += ingredientList[i] + '%2C'
    }
    list = list.slice(0, list.length-3)
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=50&ranking=1&ingredients=${list}`, {
      headers: {
        'X-RapidAPI-Key': key
      },
    })
      .then(response => {
        res.send(response.data);
        createRecipeList({ recipes: response.data })
      })
      .catch(err => console.log(err))
  })
});

app.get('/api/recipe/:id', (req, res) => {
  axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/information`, {
    headers: {
      'X-RapidAPI-Key': key
    }
  })
    .then(response => {
      console.log('recipe info', response.data)
      res.send(response.data)
    })
    .catch(err => console.log(err))
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});