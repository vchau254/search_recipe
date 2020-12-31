import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { MealPlanContent } from './mealplan.style';

const MealPlan = ({ recipe }) => {
  return (
    <Col xs={10} sm={4} md={4} lg={4}>
      <MealPlanContent>
        <Card.Title>
          <Link to={`/recipe/${recipe.id}`}>
            {recipe.title.length < 20
              ? `${recipe.title}`
              : `${recipe.title.substring(0, 25)}...`}
          </Link>
          {/* <Link>
            <img src='./love_icon.png' alt='love icon'></img>
          </Link> */}
        </Card.Title>
        <Card.Text>Serving: {recipe.servings}</Card.Text>
        <Card.Text>Ready In Minutes: {recipe.readyInMinutes}</Card.Text>
      </MealPlanContent >
    </Col>

  );
};
export default MealPlan;
