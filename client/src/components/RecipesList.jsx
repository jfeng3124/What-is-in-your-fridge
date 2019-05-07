import React from 'react';
import RecipeItem from './RecipeItem.jsx';

const List = (props) => (
  <div className='recipe-main'>
    <div className='recipe-list'>
      {props.recipes.map(recipe => <RecipeItem recipe={recipe} key={recipe.id} />)}
    </div>
  </div>
)

export default List;