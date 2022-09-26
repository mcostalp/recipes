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
      <Route path="/meals" component={ Meals } />
      {/* <Route path="/meals/:id" component={ ... } /> */}
      {/* <Route path="/meals/:id/in-progress" component={ ... } /> */}
      <Route path="/drinks" component={ Drinks } />
      {/* <Route path="/drinks/:id" component={ ... } /> */}
      {/* <Route path="/drinks/:id/in-progress" component={ ... } /> */}
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
