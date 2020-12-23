import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import FormSearch from '../../components/Form';
import Recipes from '../../components/Recipe';
import { Header, RandomRecipeContent, RecipesSearch, RandomRecipeContainer, RecipesList, Footer } from './home.styles'
import { Wrapper } from '../../components/Wapper/wrapper.style';
class SearchRecipes extends Component {
  state = {
    recipesList: [],
    randomRecipe: null,
    foodJoke: '',
    error: null,
    progress: 0
  };

  async componentDidMount() {
    try {
      this.setState({
        progress: 30,
        loading: true,
      });
      //fetch random recipe which is displayed in the header
      const random = await fetch(
        `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const randomRecipeJson = await random.json();

      //fetch default list of recipes in the body
      const recipesList = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=chicken,apple&number=1&limitLicense=true&ranking=1&ignorePantry=<boolean>&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const recipesListJson = await recipesList.json();

      //fetch random food joke in the footer
      const joke = await fetch(
        `https://api.spoonacular.com/food/jokes/random?&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const jokeJson = await joke.json();

      //send error notification when out of quotas to call API - 402 error
      if (!randomRecipeJson.recipes) {
        NotificationManager.error('You seem a bit hungry today, you don\'t have any more requests for our server');
        this.setState({
          progress: 100,
          loading: false
        })
        return;
      }
      this.setState({
        randomRecipe: randomRecipeJson.recipes.length
          ? randomRecipeJson.recipes[0]
          : null,
        recipesList: recipesListJson,
        foodJoke: jokeJson.text,
        progress: 100,
        loading: false
      });
    } catch (err) {
      NotificationManager.error(err.message);
      this.setState({
        error: err,
        progress: 100,
        loading: false
      });
    }
  }
  getRecipe = async (ingredients) => {
    if (!ingredients.length) {
      NotificationManager.warning('You need to add ingredients!');
      return;
    }
    try {
      this.setState({
        loading: true,
        progress: 50
      });
      const recipes = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=9&limitLicense=true&ranking=1&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const recipesJson = await recipes.json(); //array of object

      this.setState({ recipesList: recipesJson, loading: false, progress: 100 });
    } catch (err) {
      NotificationManager.error(err.message);
      this.setState({
        error: err,
        loading: false,
        progress: 100
      });
    }
  };
  render() {
    const { recipesList, randomRecipe, foodJoke, progress, loading } = this.state;

    return (
      <Wrapper>
        <Header>
          <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => this.setState({ progress: 0 })} />
          <RandomRecipeContainer>
            {randomRecipe && !loading && (
              <RandomRecipeContent>
                <Col xs={9} sm={5} md={5} lg={3}>
                  <img
                    src={randomRecipe.image}
                    alt="random recipe"
                    style={{ width: '100%' }}
                  ></img>
                </Col>
                <Col xs={9} sm={7} md={7} lg={9}>
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
              </RandomRecipeContent>
            )}
            {loading && 'Loading...'}
          </RandomRecipeContainer>
        </Header>

        {/* Search box */}
        <RecipesSearch >
          <h4>What do you have in your fridge?</h4>
          <FormSearch
            handleSubmit={this.getRecipe}
            btnContent={'Find a recipe'}
          />
        </RecipesSearch >

        {/* show recipes from search */}
        <Container className="recipes">

          <RecipesList>
            {recipesList.map((recipe) => (
              <Recipes key={recipe.id} recipe={recipe} />
            ))}
          </RecipesList>
        </Container>

        <Footer>
          {foodJoke}
        </Footer>
        <NotificationContainer />
      </Wrapper>
    );
  }
}

export default SearchRecipes;
