import React from 'react';
import './App.css';
import './components/Form/style.css';
import 'react-notifications/lib/notifications.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import Recipe from './containers/RecipePage';
import MealPlanner from './containers/MealPlannerPage';
import ContactMe from './containers/Contact';
import PageNotFound from './containers/PageError';
import NavBar from './components/Navbar/index'

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar />
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/recipe/:recipeId" component={Recipe}></Route>
        <Route path="/mealplanner" component={MealPlanner}></Route>
        <Route path="/contact" component={ContactMe}></Route>
        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
