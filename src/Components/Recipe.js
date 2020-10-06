import React, { Component } from 'react';

class Recipe extends Component {
  state = { activeRecipe: {}, ingredients: [], similarRecipes: [] };
  //as soon as the recipe is loaded on the screen, it shows the recipe details
  componentDidMount = async () => {
    const recipeId = this.props.location.state.recipe;
    try {
      this.setState({
        isLoading: true,
      });
      const currentRecipe = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true
            &apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const recipeJson = await currentRecipe.json(); //array of object
      this.setState({
        activeRecipe: recipeJson,
        ingredients: recipeJson.extendedIngredients,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err,
      });
    }
  };
  render() {
    const { activeRecipe, ingredients } = this.state;
    console.log(activeRecipe);
    return (
      <div className="recipe">
        <main className="recipe-active">
          <img
            className="recipe-active__img"
            src={activeRecipe.image}
            alt={activeRecipe.title}
          />
          <h1 className="recipe-active__title">{activeRecipe.title}</h1>
          <h3 className="recipe-active__subtitle">Ingredients:</h3>
          {ingredients.map((ingredient) => (
            <li className="recipe-active__ingredient">{ingredient.original}</li>
          ))}
          <h3 className="recipe-active__subtitle">Instructions</h3>
          <p className="recipe-active__instructions">
            {activeRecipe.instructions}
          </p>
        </main>
        <aside class="recipe-similar">
          {/* will use map */}
          <div>
            <img src="" alt="" />
            <h3>title</h3>
            <p>Cook time</p>
          </div>
          <div>
            <img src="" alt="" />
            <h3>title</h3>
            <p>Cook time</p>
          </div>
        </aside>
      </div>
    );
  }
}

export default Recipe;
