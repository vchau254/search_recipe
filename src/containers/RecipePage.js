import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

class Recipe extends Component {
  state = {
    error: null,
    isLoading: true,
    activeRecipe: {},
    ingredients: [],
    recipeInstructions: [],
    recipeNutrition: '',
    inputValue: '',
    autoCompleteRecipes: [],
  };
  getData = async () => {
    const { recipeId } = this.props.match.params; // Remember this!!!
    try {
      this.setState({ isLoading: true });
      // fetch recipe information
      const currentRecipe = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true
            &apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const recipeJson = await currentRecipe.json();

      //fecth recipe instructions step by step
      const instructions = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const instructionsJson = await instructions.json();

      console.log(instructions.length ? instructionsJson[0].steps : null)

      //fetch recipe nutrition
      const nutrition = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const nutritionJson = await nutrition.json();
      this.setState({
        isLoading: false,
        activeRecipe: recipeJson,
        ingredients: recipeJson.extendedIngredients,
        recipeInstructions: instructionsJson.length ? instructionsJson[0].steps : null,
        recipeNutrition: nutritionJson,
      });
    } catch (err) {
      console.log(err)
      this.setState({
        error: err,
      });
    }
  };
  //as soon as the recipe is loaded on the screen, it shows the recipe details
  componentDidMount = () => {
    this.getData();
  };
  componentDidUpdate = async (previousProps, previousState) => {
    if (previousProps.match.params !== this.props.match.params) {
      this.getData();
    }
  };
  //listen to input onChange and pass the value to call auto complete api
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
    const autoComplete = debounce(this.getAutoComplete, 500);
    autoComplete(e.target.value);
  };

  //fetch auto complete api
  getAutoComplete = async (ingredients) => {
    // try {
    //   this.setState({ isLoading: true });
    const suggestedList = await fetch(
      `https://api.spoonacular.com/recipes/autocomplete?query=${ingredients}&number=10&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const suggestedListJson = await suggestedList.json();
    this.setState({
      autoCompleteRecipes: suggestedListJson,
      isLoading: false,
    });
    //   console.log(suggestedListJson, 'here');
    // } catch (err) {
    //   this.setState({
    //     error: err,
    //   });
    // }
  };
  render() {
    const {
      activeRecipe,
      ingredients,
      error,
      recipeInstructions,
      recipeNutrition,
      isLoading,
      inputValue,
      autoCompleteRecipes,
    } = this.state;

    return (
      <div className="recipe">
        <div className="form__message">
          {error && <h2>Error:{error.message}</h2>}
          {isLoading && <h2>Loading...</h2>}
        </div>
        {/* <Link to="/recipe/632481">recipe link</Link> */}
        <div style={{ position: `relative` }}>
          <input
            style={{ position: `absolute`, top: '0px', left: '0px' }}
            placeholder="Enter ingredients....."
            value={inputValue}
            onChange={this.handleInputChange}
          />
          {inputValue &&
            autoCompleteRecipes.map((recipe) => (
              <div key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
              </div>
            ))}
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
                <div>
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
                {!recipeInstructions && <div>There are no instructions for this recipe :(</div>}
               {recipeInstructions && <div>
                  <ol>
                    {recipeInstructions.map((step) => (
                      <li key={step.number}>{step.step}</li>
                    ))}
                  </ol>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
