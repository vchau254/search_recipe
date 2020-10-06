import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form';
import Recipes from './Components/Recipes';

class App extends Component {
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
        <header>
          <div className="header">
            <h1 className="header__title">What do you need to use up?</h1>
            <Form addRecipes={this.addRecipes} />
          </div>
        </header>

        <div className="container">
          <div className="row ">
            {recipesList.map((recipe) => (
              <Recipes recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
