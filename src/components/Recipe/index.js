import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import {Col} from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Button } from '../Button/button.style';
import defaultImage from '../../images/logo2.png';



const CardWrapper = styled(Col)`
margin: 0.5em 0;
`

const Recipes = ({ recipe }) => {
  const [showMissedIngredients, setShowMissedIngredients] = useState(false);

  const savedFavoriteRecipe = (recipe) => {

    const savedInfo = { id: recipe.id, img: recipe.image, title: recipe.title };

    const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    //check if the current List is not null
    if (savedRecipes) {
    

      //check if saved recipe is duplicated
      const duplicate = savedRecipes.find(savedRecipe => savedRecipe.id === recipe.id);
      if (duplicate) {
        NotificationManager.info('You already added to the favorite recipes list');
        return; //not save to storage
      }

      //if it is not duplicate, add new saved recipe to local storage
      localStorage.setItem('favoriteRecipes', JSON.stringify([...savedRecipes, savedInfo]));
      NotificationManager.info(`${recipe.title} added`);
    } else {
      NotificationManager.info(`${recipe.title} added`);
      localStorage.setItem('favoriteRecipes', JSON.stringify([savedInfo]));
    }

  };

  console.log(recipe.image)
  return (
    
    <CardWrapper xs={10} sm={4} md={4} lg={3}>

      <Card bg='light'>
        <Card.Img src={recipe.image ? recipe.image : defaultImage} alt="recipe" />
        <Card.Body>

          <Card.Title>
            <Link to={`/recipe/${recipe.id}`}>
              {recipe.title.length < 20
                ? `${recipe.title}`
                : `${recipe.title.substring(0, 25)}...`}
            </Link>
          </Card.Title>
          {recipe.missedIngredients.length && (
            <Card.Text onClick={() => setShowMissedIngredients(!showMissedIngredients)}>
              Missing ingredients:{recipe.missedIngredients.length}
            </Card.Text>
          )}
          {showMissedIngredients && (
            <Card.Text>
              {recipe.missedIngredients.map((missedIngredient) => (
                <li key={missedIngredient.name}>{missedIngredient.name}</li>
              ))}
            </Card.Text>
          )}
        </Card.Body>
        <Button variant='primary' onClick={() => savedFavoriteRecipe(recipe)}>Add to favorite list</Button>
      </Card>
      <NotificationContainer />
    </CardWrapper>
    
  );

};

export default Recipes;
