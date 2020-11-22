import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from '../components/Form';
import Recipes from '../components/Recipe';
import NavBar from '../components/Navbar';
import { Link } from 'react-router-dom';


class SearchRecipes extends Component {
  state = {
    recipesList: [],
    isLoading: false,
    randomRecipe: null,
    foodJoke: '',
  };

  async componentDidMount () {
    console.log('component did mount');
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
      randomRecipeJson.recipes[0].summary.split('href="').shift().forEach(text => {
       console.log(text.split('">'))
      })
      this.setState({
        randomRecipe: randomRecipeJson.recipes.length ? randomRecipeJson.recipes[0] : null,

        recipesList: recipesListJson,
        foodJoke: jokeJson.text,
        isLoading: false,
      });
    } catch (err) {
      console.log(err)
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
    const {
      recipesList,
      randomRecipe,
      foodJoke,
    } = this.state;

    return (
      <div className="App">
        <header>
          <NavBar />
          <Container style={{ maxWidth: '80%' }}>
            {randomRecipe ? <Row>
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
                <p dangerouslySetInnerHTML={{ __html: randomRecipe.summary }} />
              </Col>
            </Row> :  'Loading'}
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
