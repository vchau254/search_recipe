import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import { Container, Row, Col } from 'react-bootstrap';

class Recipe extends Component {
  state = {
    error: null,
    isLoading: true,
    activeRecipe: {},
    ingredients: [],
    recipeInstructions: [],
    recipeNutrition: '',
  };
  getData = async () => {
    const { recipeId } = this.props.match.params; // Remember this!!!
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
  //as soon as the recipe is loaded on the screen, it shows the recipe details
  componentDidMount = () => {
    this.getData();
  };
  componentDidUpdate = async (previousProps, previousState) => {
    if (previousProps.match.params !== this.props.match.params) {
      this.getData();
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
    console.log(activeRecipe);

    return (
      <Container fluid className="recipe-page">
        <div className="form__message">
          {error && <h2>Error:{error.message}</h2>}
          {isLoading && <h2>Loading...</h2>}
        </div>
        <NavBar notHomePage={true} />
        <Container className="recipe-content">
          <h1 className="recipe-title">{activeRecipe.title}</h1>
          <h5 className="recipe-author">By {activeRecipe.sourceName} </h5>
          <Row>
            <Col xs={12} md={8}>
              <img
                className="recipe-img"
                src={activeRecipe.image}
                alt={activeRecipe.title}
              />
            </Col>
            <Col xs={12} md={3}>
              <Row>
                <Col xs={2} md={12} lg={12} className="recipe-nutrition">
                  Total <p>{recipeNutrition.calories} Kcal</p>
                </Col>
                <Col xs={2} md={12} lg={12} className="recipe-nutrition">
                  Carbs <p>{recipeNutrition.carbs}</p>
                </Col>
                <Col xs={2} md={12} lg={12} className="recipe-nutrition">
                  Protein <p>{recipeNutrition.protein}</p>
                </Col>
                <Col xs={2} md={12} lg={12} className="recipe-nutrition">
                  Fat <p>{recipeNutrition.fat}</p>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col xs={5} sm={3} className="recipe-info">
              Serves
              <p>{activeRecipe.servings} serving</p>
            </Col>
            <Col xs={5} sm={3} className="recipe-info">
              Prep
              <p>{activeRecipe.readyInMinutes} minutes</p>
            </Col>
            <Col xs={5} sm={3} className="recipe-info">
              Health Score <p>{activeRecipe.healthScore}</p>
            </Col>
            <Col xs={5} sm={3} className="recipe-info">
              Source <p>{activeRecipe.sourceName}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={3}>
              <h5>Ingredients</h5>
              <ul>
                {ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="recipe-active__ingredient">
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </Col>
            <Col sm={12} md={8}>
              <h5>Instructions</h5>
              <ol>
                {recipeInstructions.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Recipe;
