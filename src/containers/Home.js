import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FormSearch from '../components/Form';
import Recipes from '../components/Recipe';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

class SearchRecipes extends Component {
  state = {
    recipesList: [],
    isLoading: false,
    randomRecipe: null,
    foodJoke: '',
  };

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true,
      });
      //fetch random recipe which is displayed in the header
      const random = await fetch(
        `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const randomRecipeJson = await random.json();

      //fetch default list of recipes in the body
      const recipesList = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=chicken,apple&number=9&limitLicense=true&ranking=1&ignorePantry=<boolean>&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const recipesListJson = await recipesList.json();

      //fetch random food joke in the footer
      const joke = await fetch(
        `https://api.spoonacular.com/food/jokes/random?&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const jokeJson = await joke.json();

      this.setState({
        randomRecipe: randomRecipeJson.recipes.length
          ? randomRecipeJson.recipes[0]
          : null,
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
  }
  getRecipe = async (ingredients) => {
    try {
      this.setState({
        isLoading: true,
      });
      const recipes = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=12&limitLicense=true&ranking=1&apiKey=${process.env.REACT_APP_API_KEY}`
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
    const { recipesList, randomRecipe, foodJoke } = this.state;

    return (
      <div>
        <header>
          <NavBar />
          <Container style={{ maxWidth: '80%' }}>
            {randomRecipe ? (
              <Row className="random-recipe-content">
                <Col xs={12} sm={10} md={4}>
                  <img
                    src={randomRecipe.image}
                    alt="random recipe"
                    style={{ width: '100%' }}
                  ></img>
                </Col>
                <Col xs={12} sm={10} md={8}>
                  <Link to={`/recipe/${randomRecipe.id}`}>
                    <h3>{randomRecipe.title}</h3>
                  </Link>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        randomRecipe.summary < 350
                          ? randomRecipe.summary
                          : `${randomRecipe.summary.substring(0, 350)}....`,
                    }}
                  />
                </Col>
              </Row>
            ) : (
              'Loading....'
            )}
          </Container>
        </header>

        <Container className="recipes">
          <Row className="recipe-search">
            <h4>What do you have in your fridge?</h4>
            <FormSearch
              handleSubmit={this.getRecipe}
              btnContent={'Find a recipe'}
            />
          </Row>
          <Row>
            {recipesList.map((recipe) => (
              <Recipes key={recipe.id} recipe={recipe} />
            ))}
          </Row>
        </Container>
        <Container fluid>
          <Row className="footer">{foodJoke}</Row>
        </Container>
      </div>
    );
  }
}

export default SearchRecipes;
