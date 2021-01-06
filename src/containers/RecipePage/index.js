import React, { Component } from 'react';
import {Row, Col } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {RecipePage,RecipeContent, RecipeInfo, RecipeNutrition, RecipeInstructions} from './recipepage.style';

class Recipe extends Component {
    state = {
        error: null,
        progress: 0,
        loading: false,
        activeRecipe: {},
        ingredients: [],
        recipeInstructions: [],
        recipeNutrition: '',
    };
    getData = async () => {
        const { recipeId } = this.props.match.params; // Remember this!!!
        try {
            this.setState({ progress: 50, loading: true });
            // fetch recipe information
            const currentRecipe = await fetch(
                `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true
            &apiKey=${process.env.REACT_APP_API_KEY}`
            );
            const recipeJson = await currentRecipe.json();

            //send error notification when out of quotas to call API - 402 error
            if (!recipeJson) {
                NotificationManager.error('You seem a bit hungry today, you don\'t have any more requests for our server');
                this.setState({
                    progress: 100,
                    loading: false
                })
                return;
            }

            //fetch recipe instructions step by step
            const instructions = await fetch(
                `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?&apiKey=${process.env.REACT_APP_API_KEY}`
            );
            const instructionsJson = await instructions.json();

            //fetch recipe nutrition
            const nutrition = await fetch(
                `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?&apiKey=${process.env.REACT_APP_API_KEY}`
            );
            const nutritionJson = await nutrition.json();

            this.setState({
                progress: 100,
                activeRecipe: recipeJson,
                ingredients: recipeJson.extendedIngredients,
                recipeInstructions: instructionsJson.length
                    ? instructionsJson[0].steps
                    : [],
                recipeNutrition: nutritionJson,
                loading: false,
            });
        } catch (err) {
            NotificationManager.error(err.message);
            this.setState({
                error: err,
                loading: false
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
            recipeInstructions,
            recipeNutrition,
            progress,
        } = this.state;

        return (
            <RecipePage fluid>
                <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => this.setState({ progress: 0 })} />
                <RecipeContent >
                    <h1>{activeRecipe.title}</h1>
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
                                <RecipeNutrition xs={2} md={12} lg={12} >
                                    Total <p>{recipeNutrition.calories} Kcal</p>
                                </RecipeNutrition>
                                <RecipeNutrition xs={2} md={12} lg={12}>
                                    Carbs <p>{recipeNutrition.carbs}</p>
                                </RecipeNutrition>
                                <RecipeNutrition xs={2} md={12} lg={12}>
                                    Protein <p>{recipeNutrition.protein}</p>
                                </RecipeNutrition>
                                <RecipeNutrition xs={2} md={12} lg={12}>
                                    Fat <p>{recipeNutrition.fat}</p>
                                </RecipeNutrition>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <RecipeInfo xs={5} sm={3} >
                            Serves
              <p>{activeRecipe.servings} serving</p>
                        </RecipeInfo>
                        <RecipeInfo xs={5} sm={3} >
                            Prep
              <p>{activeRecipe.readyInMinutes} minutes</p>
                        </RecipeInfo>
                        <RecipeInfo xs={5} sm={3} >
                            Health Score <p>{activeRecipe.healthScore}</p>
                        </RecipeInfo>
                        <RecipeInfo xs={5} sm={3} >
                            Source <p>{activeRecipe.sourceName}</p>
                        </RecipeInfo>
                    </Row>
                    <RecipeInstructions>
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
                            {/* if array length = 0 so no instructions available */}
                            {/* empty array is still TRUTHY */}
                            {recipeInstructions.length ? (
                                <ol>
                                    {recipeInstructions.map((step) => (
                                        <li key={step.number}>{step.step}</li>
                                    ))}
                                </ol>
                            ) : (
                                    <p>No instructions available</p>
                                )}
                        </Col>
                    </RecipeInstructions>
                </RecipeContent>
                <NotificationContainer />
            </RecipePage>
        );
    }
}

export default Recipe;
