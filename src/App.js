import React from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/Home/index';
import Recipe from './containers/RecipePage/index';
import MealPlanner from './containers/MealPlanner/index';
import ContactMe from './containers/ContactPage/index';
import SavedPage from './containers/SavedPage/index';
import PageNotFound from './containers/ErrorPage/index';
import NavBar from './components/Navbar/index';


function App() {
  return (
    <BrowserRouter className="App">
      <NavBar />
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/recipe/:recipeId" component={Recipe}></Route>
        <Route path="/mealplanner" component={MealPlanner}></Route>
        <Route path="/favorite" component={SavedPage}></Route>
        <Route path="/contact" component={ContactMe}></Route>
        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
