const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mvp');
const timestamp = require('mongoose-timestamp-plugin');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('openUri', function() {
  console.log('mongoose connected successfully');
});

const ingredientsList = mongoose.Schema({
  ingredientNames: [String],
});

const recipeList = mongoose.Schema({
  recipes: [{
    id: Number,
    title: String,
    likes: Number,
    usedIngredientCount: Number
  }]
})

ingredientsList.plugin(timestamp, {
  createdName: 'created_at',
  disableUpdated: true
});

const List = mongoose.model('List', ingredientsList);
const Recipes = mongoose.model('Recipes', recipeList);

module.exports = {List, Recipes};