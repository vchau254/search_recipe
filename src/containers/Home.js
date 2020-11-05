import React, { Component } from 'react';
import Form from '../components/Form';
import Recipes from '../components/Recipe';

class SearchRecipes extends Component {
  state = { recipesList: [], isLoading: false };
  getRecipe = async (ingredients) => {
    console.log('here');
    try {
      this.setState({
        isLoading: true,
      });
      const recipes = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=12&limitLicense=true&ranking=1&apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const recipesJson = await recipes.json(); //array of object

      this.setState({ recipesList: recipesJson, isLoading: false });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err,
      });
    }
  };
  render() {
    const { recipesList } = this.state;
    return (
      <div className="App">
        <header>
          <div className="header">
            <h1 className="header__title">What do you need to use up?</h1>
            <Form handleSubmit={this.getRecipe} btnContent={'Find a recipe'} />
          </div>
        </header>

        <div className="container recipes-container">
          <div className="row">
            {recipesList.map((recipe) => (
              <Recipes key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchRecipes;
