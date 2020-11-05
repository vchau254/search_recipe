import React from 'react';
import { Link } from 'react-router-dom';

const MealPlan = ({ recipe }) => {
  return (
    <div className="col-md-4">
      <h3 className="recipes-info__title">
        <Link to={`/recipe/${recipe.id}`}>
          {recipe.title.length < 20
            ? `${recipe.title}`
            : `${recipe.title.substring(0, 25)}...`}
        </Link>
      </h3>
      <p>Serving: {recipe.servings}</p>
      <p>Ready In Minutes: {recipe.readyInMinutes}</p>
    </div>
  );
};
export default MealPlan;
