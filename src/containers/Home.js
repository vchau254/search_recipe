import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from '../components/Form';
import Recipes from '../components/Recipe';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

class SearchRecipes extends Component {
  state = {
    recipesList: [],
    isLoading: false,
    randomRecipe: {},
    randomRecipeInstructions: '',
    foodJoke: '',
  };

  componentDidMount = async () => {
    console.log('component did mount');
    try {
      this.setState({
        isLoading: true,
      });
      //fetch random recipe which is displayed in the header
      const random = await fetch(
        `https://api.spoonacular.com/recipes/random?number=1&apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const randomRecipeJson = await random.json();

      //fetch default list of recipes in the body
      const recipesList = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=chicken,apple&number=9&limitLicense=true&ranking=1&ignorePantry=<boolean>&apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const recipesListJson = await recipesList.json();

      //fetch random food joke in the footer
      const joke = await fetch(
        `https://api.spoonacular.com/food/jokes/random?&apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const jokeJson = await joke.json();

      this.setState({
        randomRecipe: randomRecipeJson.recipes[0],
        randomRecipeInstructions: randomRecipeJson.recipes[0].instructions,
        recipesList: recipesListJson,
        foodJoke: jokeJson.text,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err,
      });
    }
  };
  getRecipe = async (ingredients) => {
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
    const {
      recipesList,
      randomRecipe,
      randomRecipeInstructions,
      foodJoke,
    } = this.state;

    return (
      <div className="App">
        <header>
          <NavBar />
          <Container style={{ maxWidth: '80%' }}>
            <Row>
              <Col md={5}>
                <img
                  src={randomRecipe.image}
                  alt="random recipe"
                  style={{ width: '100%' }}
                ></img>
              </Col>
              <Col md={6}>
                <Link to={`/recipe/${randomRecipe.id}`}>
                  <h2>{randomRecipe.title}</h2>
                </Link>
                <p>
                  Direction: {randomRecipeInstructions.substring(0, 350)}.....
                </p>
              </Col>
            </Row>
          </Container>
        </header>

        <Container style={{ maxWidth: '80%' }}>
          <Row>
            <Col md={3}>
              <Form
                handleSubmit={this.getRecipe}
                btnContent={'Find a recipe'}
              />
            </Col>
            <Col md={9}>
              <Row>
                {recipesList.map((recipe) => (
                  <Recipes key={recipe.id} recipe={recipe} />
                ))}
              </Row>
            </Col>
          </Row>
          <Row style={{ justifyContent: 'center' }}>{foodJoke}</Row>
        </Container>
      </div>
    );
  }
}

export default SearchRecipes;
