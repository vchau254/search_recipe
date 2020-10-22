import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import Recipe from './containers/RecipePage';
import MealPlanner from './containers/MealPlannerPage';
import Trivia from './containers/TriviaPage';
import NavBar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
     <NavBar />
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/recipe/:recipeId" component={Recipe}></Route>
        <Route path="/mealplanner" component={MealPlanner}></Route>
        <Route path="/trivia" component={Trivia}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
