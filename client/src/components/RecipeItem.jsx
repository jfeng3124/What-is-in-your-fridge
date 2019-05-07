import React from 'react';
import axios from 'axios';
import Ingredient from './Ingredient.jsx';
import Modal from 'react-modal';

class RecipeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.recipe.id,
      recipe: null,
      modal: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getRecipeInfo(e) {
    e.preventDefault();
    axios.get(`/api/recipe/${this.state.id}`)
      .then(response => {
        this.setState({ 
          recipe: response.data,
          modal: true
        })
      })
      .catch(err => console.log(err))
  }

  openModal() {
    this.setState({modal: true});
  }
 
  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modal: false});
  }

  render() {
    const { recipe } = this.state;
    if (!recipe) {
      return (
        <div>
          <div id='recipe-title' onClick={this.getRecipeInfo.bind(this)}>{this.props.recipe.title}</div>
          <img id='recipe-photo' src={this.props.recipe.image} onClick={this.getRecipeInfo.bind(this)} />
        </div>
      )
    }
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
 
        <div id="modalContainer">
          <div className='recipe-info'>
            <img id='recipe-photo' src={recipe.image} />
            <div id='recipe-title'><h3>{recipe.title}</h3></div>
            <div id='recipe-time'>Cooking Time: {recipe.readyInMinutes} minutes</div><br/>
            Ingredients: <br/>
            <ul>{recipe.extendedIngredients.map(ingredient => <Ingredient ingredient={ingredient} key={ingredient.id} />)} </ul><br/>
            <div id='recipe-instructions'>Instructions: <br/><br/>{recipe.instructions}</div><br/>
        </div>
      </div>
        </Modal>
      </div>
    );
  }
}

export default RecipeItem;