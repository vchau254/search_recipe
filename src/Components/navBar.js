import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <NavLink to="/">Search Recipe</NavLink>
      <NavLink to="/trivia">Trivia</NavLink>
      <NavLink to="/mealplanner">Meal Planner</NavLink>
    </div>
  );
};
export default NavBar;
