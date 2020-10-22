import React, { Component } from 'react';
import Form from './Form';
import Recipes from './Recipes';
import NavBar from '../Components/navBar';

class SearchRecipes extends Component {
  state = { recipesList: [] };
  addRecipes = (recipesJson) => {
    const { recipesList } = this.state;
    const updatedList = [...recipesList, ...recipesJson];
    this.setState({ recipesList: updatedList });
  };

  render() {
    const { recipesList } = this.state;
    return (
      <div className="App">
        <NavBar />
        <header>
          <div className="header">
            <h1 className="header__title">What do you need to use up?</h1>
            <Form addRecipes={this.addRecipes} />
          </div>
        </header>

        <div className="container recipes-container">
          <div className="row ">
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
