const {List, Recipes} = require('./index');

const createList = ingredients => {
  let list = new List();
  list.ingredientNames = ingredients.ingredientNames;
  list.save();
};

const createRecipeList = input => {
  let list = new Recipes();
  list.recipes = [];
  input.recipes.map(recipe => list.recipes.push(recipe));
  list.save();
}

const findList = cb => {
  List.find().sort({created_at: -1}).limit(1).exec((err, ingredients) => {
    if (err) throw err;
    cb(ingredients);
  });
};

// const updateList = (ingredients, recipesList) => {
//   List.findOneAndUpdate({ingredientNames: ingredients}, {recipes: recipesList}, (err, result) => {
//     if (err) throw err;
//     console.log('result', result)
//     result.recipes.push(recipesList);
//     result.save();
//   });
// };

const deleteIngredient = ingredient => {
  List.findByIdAndDelete(ingredient._id, err => {
    if (err) throw err;
  })
}

module.exports = {
  createList,
  createRecipeList,
  findList,
  // updateList,
  deleteIngredient
}


