import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RecipesList from './components/RecipesList.jsx';
import Pagination from './components/Pagination.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ingredients: '',
      allRecipes: null,
      recipes: null,
      recipe: null,
      currentRecipes: null,
      currentPage: 1,
      totalPages: 1,
      homePage: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.scrollToTopOfFeed = this.scrollToTopOfFeed.bind(this);
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
        this.setState({ 
          allRecipes: response.data,
          recipes: response.data.slice(0, 9), 
          totalPages: Math.round(response.data.length / 9),
          currentRecipes: response.data
        })
      })
      .catch(err => console.log(err))
  }

  onSubmit(e) {
    e.preventDefault();
    this.sendData();
    this.getData();
    this.setState({ingredients: '', homePage: false});
  }

  returnHome(e) {
    e.preventDefault();
    this.setState({homePage:true});
  }

  handlePageChange(page) {
    const { currentRecipes } = this.state;
    this.setState({
      recipes: currentRecipes.slice((page - 1) * 9, page * 9),
      currentPage: page
    });
  }

  scrollToTopOfFeed() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const {currentPage, totalPages, allRecipes, homePage} = this.state;
    if (!allRecipes || homePage === true) {
      return (
        <div id='main-page'>
          <h1>What's in your fridge?</h1>
            <form onSubmit={this.onSubmit} id={'form'} autoComplete="off">
              <label>Please separate ingredients by commas (example: apple, sugar, cinnamon)</label><br/>
              <input type='text' id='input-box' autoComplete="false" value={this.state.ingredients} onChange={this.onChange} /><br/>
              <input type='submit' value='Submit' id='submit' />
            </form>
        </div>
      )
    }
    return (
    <div id='recipe-container'>
      <h1 onClick={this.returnHome.bind(this)} id='return-home'>What's for dinner?</h1>
      <RecipesList recipes={this.state.recipes} />
      <Pagination
          handlePageChange={this.handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          scrollToTopOfFeed={this.scrollToTopOfFeed}
        />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));