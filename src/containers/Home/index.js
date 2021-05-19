import React, { Component } from "react";
import { Container, Col } from "react-bootstrap";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import FormSearch from "../../components/Form";
import Recipes from "../../components/Recipe/index";
import CarouselSlides from "../../components/Carousel/index";
import {
  Header,
  RandomRecipeContent,
  RecipesSearch,
  RandomRecipeContainer,
  RecipesList,
  Footer,
} from "./home.styles";

class SearchRecipes extends Component {
  state = {
    recipesList: [],
    defaultIngredients: `chicken,apple`,
    randomRecipes: [],
    foodJoke: "",
    error: null,
    progress: 0,
  };

  async componentDidMount() {
    const { defaultIngredients } = this.state;

    try {
      this.setState({
        progress: 30,
        loading: true,
      });
      //fetch random recipe which is displayed in the header
      const random = await fetch(
        `https://api.spoonacular.com/recipes/random?number=5&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const randomRecipesJson = await random.json();

      //fetch default list of recipes in the body
      //if (localStorage.getItem("currentRecipesList")) {
      //  this.setState({ recipesList: JSON.parse(localStorage.getItem("currentRecipesList")) })
      //} else {
      //  const recipesFetch = await fetch(
      //    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${defaultIngredients}&number=6&limitLicense=true&ranking=1&apiKey=${process.env.REACT_APP_API_KEY}`
      //  );
      //  const recipesListJson = await recipesFetch.json();
      //  this.setState({ recipesList: recipesListJson, })
      //  localStorage.setItem("currentRecipesList", JSON.stringify(recipesListJson));
      //}

      //fetch random food joke in the footer
      //const joke = await fetch(
      //  `https://api.spoonacular.com/food/jokes/random?&apiKey=${process.env.REACT_APP_API_KEY}`
      //);
      //const jokeJson = await joke.json();

      //send error notification when out of quotas to call API - 402 error
      if (!randomRecipesJson.recipes) {
        NotificationManager.error(
          "You seem a bit hungry today, you don't have any more requests for our server"
        );
        this.setState({
          progress: 100,
          loading: false,
        });
        return;
      }
      this.setState({
        randomRecipes: randomRecipesJson.recipes.length
          ? randomRecipesJson.recipes
          : null,
        //foodJoke: jokeJson.text,
        progress: 100,
        loading: false,
      });
      console.log(randomRecipesJson);
    } catch (err) {
      NotificationManager.error(err.message);
      this.setState({
        error: err,
        progress: 100,
        loading: false,
      });
    }
  }
  getRecipe = async (ingredients) => {
    if (!ingredients.length) {
      NotificationManager.warning("You need to add ingredients!");
      return;
    }

    try {
      this.setState({
        loading: true,
        progress: 50,
      });
      //const recipes = await fetch(
      //  `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&limitLicense=true&ranking=1&apiKey=${process.env.REACT_APP_API_KEY}`
      //);
      //const recipesJson = await recipes.json(); //array of object

      //this.setState({ recipesList: recipesJson, loading: false, progress: 100 });

      //clear local storage before set new search ingredients
      //localStorage.clear("currentRecipesList");
      //save current search ingredient to local storage
      //localStorage.setItem("currentRecipesList", JSON.stringify(recipesJson));
    } catch (err) {
      NotificationManager.error(err.message);
      this.setState({
        error: err,
        loading: false,
        progress: 100,
      });
    }
  };

  render() {
    const { recipesList, randomRecipes, foodJoke, progress, loading } =
      this.state;

    return (
      <div>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => this.setState({ progress: 0 })}
        />
        <header>
          {/*<RandomRecipeContainer>*/}
          {randomRecipes && !loading && (
            //<RandomRecipeContent>
            //  <Col xs={6} sm={5} md={5} lg={3}>
            //    <img
            //      src={randomRecipe.image}
            //      alt="random recipe"
            //      style={{ width: "100%" }}
            //    ></img>
            //  </Col>
            //  <Col xs={10} sm={7} md={7} lg={9}>
            //    <Link to={`/recipe/${randomRecipe.id}`}>
            //      <h3>{randomRecipe.title}</h3>
            //    </Link>
            //    <p
            //      dangerouslySetInnerHTML={{
            //        __html:
            //          randomRecipe.summary < 350
            //            ? randomRecipe.summary
            //            : `${randomRecipe.summary.substring(0, 350)}....`,
            //      }}
            //    />
            //  </Col>
            //</RandomRecipeContent>
            <CarouselSlides randomRecipes={randomRecipes}></CarouselSlides>
          )}
          {loading && "Loading..."}
          {/*</RandomRecipeContainer>*/}
        </header>

        {/* Search box */}
        {/*<RecipesSearch >
          <h4>What do you have in your fridge?</h4>
          <FormSearch
            handleSubmit={this.getRecipe}
            btnContent={'Find a recipe'}
          />
        </RecipesSearch >*/}

        {/* show recipes from search */}
        {/*<Container className="recipes">

          <RecipesList>
            {recipesList.map((recipe) => (
              <Recipes key={recipe.id} recipe={recipe} />
            ))}
          </RecipesList>
        </Container>*/}

        {/*<Footer>
          {foodJoke}
        </Footer>
        <NotificationContainer />*/}
      </div>
    );
  }
}

export default SearchRecipes;
