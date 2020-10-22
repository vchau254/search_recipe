import React, { Component } from 'react';

class Recipe extends Component {
  state = {
    error: null,
    isLoading: true,
    activeRecipe: {},
    ingredients: [],
    recipeInstructions: [],
    recipeNutrition: '',
  };
  //as soon as the recipe is loaded on the screen, it shows the recipe details
  componentDidMount = async () => {
    console.log(this.props)
    const {recipeId} = this.props.match.params; // Remember this!!!
    try {
      this.setState({ isLoading: true });
      // fetch recipe information
      const currentRecipe = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true
            &apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const recipeJson = await currentRecipe.json();

      //fecth recipe instructions step by step
      const instructions = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?&apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const instructionsJson = await instructions.json();

      //fetch recipe nutrition
      const nutrition = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?&apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const nutritionJson = await nutrition.json();
      console.log(nutritionJson);
      this.setState({
        isLoading: false,
        activeRecipe: recipeJson,
        ingredients: recipeJson.extendedIngredients,
        recipeInstructions: instructionsJson[0].steps,
        recipeNutrition: nutritionJson,
      });
    } catch (err) {
      this.setState({
        error: err,
      });
    }
  };
  render() {
    const {
      activeRecipe,
      ingredients,
      error,
      recipeInstructions,
      recipeNutrition,
      isLoading,
    } = this.state;
    return (
      <div className="recipe">
        <div className="form__message">
          {error && <h2>Error:{error.message}</h2>}
          {isLoading && <h2>Loading...</h2>}
        </div>
        <div className="recipe-wrapper">
          <div className="recipe-container">
            <img
              className="recipe-container__img"
              src={activeRecipe.image}
              alt={activeRecipe.title}
            />
            <div className="recipe-info">
              <div className="recipe-info--badges">
                Total <p>{recipeNutrition.calories} cal</p>
              </div>
              <div className="recipe-info--badges">
                Carbs <p>{recipeNutrition.carbs}</p>
              </div>
              <div className="recipe-info--badges">
                Protein <p>{recipeNutrition.protein}</p>
              </div>
              <div className="recipe-info--badges">
                Fat <p>{recipeNutrition.fat}</p>
              </div>
            </div>
          </div>

          <h1 className="recipe-container__title">{activeRecipe.title}</h1>

          <div className="recipe-container__info">
            <p>
              Serves <span>{activeRecipe.servings}</span>
            </p>
            <p>
              Prep <span>{activeRecipe.readyInMinutes} minutes</span>
            </p>
            <p>
              Health Score <span>{activeRecipe.healthScore}</span>
            </p>
            <p>
              Source <span>{activeRecipe.sourceName}</span>
            </p>
          </div>

          <div
            className="container recipe-container-subtitle"
            style={{ paddingLeft: '0' }}
          >
            <div className="row recipe_instruction">
              <div className="col-md-4 recipe_instruction__ing">
                <h3 className="recipe-container__subtitle">Ingredients</h3>
                <div style={{ border: '1px red solid' }}>
                  <ul>
                    {ingredients.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        className="recipe-active__ingredient"
                      >
                        {ingredient.original}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-8 recipe_instruction__inst">
                <h3 className="recipe-container__subtitle">Instructions</h3>
                <div style={{ border: '1px red solid' }}>
                  <ol>
                    {recipeInstructions.map((step) => (
                      <li key={step.number}>{step.step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
