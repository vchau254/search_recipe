import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchRecipes from './Containers/SearchRecipes';
import Recipe from './Containers/Recipe';
import MealPlanner from './Containers/MealPlanner';
import Trivia from './Containers/Trivia';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={SearchRecipes} exact></Route>
        <Route path="/recipe:id" component={Recipe}></Route>
        <Route path="/mealplanner" component={MealPlanner}></Route>
        <Route path="/trivia" component={Trivia}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
