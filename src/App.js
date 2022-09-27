import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DoneRecipes from './Pages/DoneRecipes';
import Drinks from './Pages/Drinks';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Profile from './Pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      {/* <Route exact path="/meals/:id" component={ MealsDetails } /> */}
      {/* <Route exact path="/meals/:id/in-progress" component={ ... } /> */}
      <Route exact path="/drinks" component={ Drinks } />
      {/* <Route exact path="/drinks/:id" component={ ... } /> */}
      {/* <Route exact path="/drinks/:id/in-progress" component={ ... } /> */}
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
