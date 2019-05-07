import React from 'react';
import RecipeItem from './RecipeItem.jsx';

const List = (props) => (
  <div>
    <h4> Recipes </h4>
    {props.recipes.map(recipe => <RecipeItem recipe={recipe} key={recipe.id} />)}
  </div>
)

export default List;