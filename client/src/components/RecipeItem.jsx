import React from 'react';

const RecipeItem = (props) => (
  <div>
    <div id='recipe-title'>{ props.item.title }</div>
    <img id='recipe-photo' src={ props.item.image } />
  </div>
)

export default RecipeItem;