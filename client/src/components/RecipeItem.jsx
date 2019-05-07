import React from 'react';
import axios from 'axios';
import Recipe from './Recipe';

class RecipeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item.id,
      recipe: null
    }
  }

  getRecipeInfo(e) {
    e.preventDefault();
    axios.get(`/api/recipe/${this.state.id}`)
      .then(response => {
        this.setState({ recipe: response.data })
      })
  }

  render() {
    const { recipe } = this.state;
    if (!recipe) {
      return (
        <div>
          <div id='recipe-title' onClick={this.getRecipeInfo.bind(this)}>{ this.props.item.title }</div>
          <img id='recipe-photo' src={ this.props.item.image }  />
        </div>
      )
    }
    return (
      <div>
        <Recipe recipe={recipe} key={recipe.id} />
      </div>
    )
  }
}

// const RecipeItem = (props) => (
//   <div>
//     <div id='recipe-title' onClick={(e) => props.onClick(e.target.value)}>{ props.item.title }</div>
//     <img id='recipe-photo' src={ props.item.image } onClick={(e) => props.onClick(e.target.value)} />
//   </div>
// )

export default RecipeItem;