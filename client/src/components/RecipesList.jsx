import React from 'react';
import RecipeItem from './RecipeItem.jsx';

const List = (props) => (
  <div>
    <h4> Recipes </h4>
    { props.recipes.map(item => <RecipeItem item={item} key={item.id} />)}
  </div>
)

export default List;