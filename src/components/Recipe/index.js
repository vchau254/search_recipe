import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


// update fav recipe in the local storage

const Recipes = ({ recipe }) => {
  const [showMissedIngredients, setShowMissedIngredients] = useState(false);
  //toggle missed ingredients div
  showMissedIngredients = () => {
    setShowMissedIngredients(!showMissedIngredients);
  };
  const savedFavoriteRecipe = (recipe) => {
    //get fav recipe to local storage => to have a current list
    const favRecipes = localStorage.getItem('favoriteRecipe', JSON.stringify(recipe));

    //check if it is existed
    const duplicate = favRecipes.find(newRecipe => newRecipe.id === recipe.id)

    // if not existed, update new recipe to the fav list
    if (duplicate) {
      return;
    } else {
      favRecipes.push(recipe);
      localStorage.setItem('favoriteRecipe', favRecipes);
    };
  };
  return (
    <Col xs={10} sm={4} md={4} lg={4}>
      <Card bg="light">
        <Card.Img variant="top" src={recipe.image} alt="recipe" />
        <button type='button' onClick={savedFavoriteRecipe(recipe)}>Fav</button>
        <Card.Body>
          <Card.Title>
            <Link to={`/recipe/${recipe.id}`}>
              {recipe.title.length < 20
                ? `${recipe.title}`
                : `${recipe.title.substring(0, 25)}...`}
            </Link>
          </Card.Title>
          {recipe.missedIngredients.length && (
            <Card.Text onClick={this.showMissedIngredients}>
              Missing ingredients:{recipe.missedIngredients.length}
            </Card.Text>
          )}

          {this.state.showMissedIngredients && (
            <Card.Text>
              {recipe.missedIngredients.map((missedIngredient) => (
                <p key={missedIngredient.name}>{missedIngredient.name}</p>
              ))}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </Col>
  );

}

export default Recipes;
