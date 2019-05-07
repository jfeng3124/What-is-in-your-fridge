import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RecipesList from './components/RecipesList.jsx';
// import Recipe from './components/Recipe.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ingredients: '',
      recipes: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({ingredients: e.target.value})
  }

  sendData() {
    axios.post('/api/ingredients', {
      ingredientNames: this.state.ingredients
    })
      .then(() => console.log('sent!'))
      .catch(err => console.log(err))
  }

  getData() {
    axios.get('/api/recipes')
      .then(response => {
        this.setState({ recipes: response.data})
      })
      .catch(err => console.log(err))
  }

  // getRecipeInfo() {
  //   axios.get('/api/recipe')
  //     .then(response => {
  //       this.setState({ recipe: response.data })
  //       console.log('response', this.state.recipe)
  //     })
  // }
  
  // onClick(e) {
  //   e.preventDefault();
  //   this.getRecipeInfo();
  // }

  onSubmit(e) {
    e.preventDefault();
    this.sendData();
    this.getData();
    console.log(this.state)
  }

  render() {
    if (!this.state.recipes) {
      return (
        <div id='main-page'>
          <h1>What's for Dinner?</h1>
            <form onSubmit={this.onSubmit}>
              Please separate ingredients by commas (example: apple,sugar,cinnamon)
              <input type='text' id='input-box' value={this.state.ingredients} placeholder="What's in your fridge?" onChange={this.onChange} />
              <input type='submit' value='Submit' />
            </form>
        </div>
      )
    }
    // if (!this.state.recipe) {
    //   return (
    //     <div>
    //     <h1>What's for Dinner?</h1>
    //     <Recipe recipe={this.state.recipe}/>
    //   </div>
    //   )
    // }
    return (
    <div>
      <h1>What's for Dinner?</h1>
      <RecipesList recipes={this.state.recipes} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));