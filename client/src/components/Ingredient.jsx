import React from 'react';

const Ingredient = props => (
  <div>
    <li id='ingredient'>{props.ingredient.originalString}</li>
  </div>
)

export default Ingredient;