import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import Recipe from './Recipe';

class Router extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} exact></Route>
          <Route paht="/recipe:id" component={Recipe}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
