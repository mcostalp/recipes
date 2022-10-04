import React from 'react';
import Header from '../Components/Header';

function DoneRecipes() {
  const h1Title = 'Done Recipes';
  return (
    <div>
      <Header
        h1Title={ h1Title }
        profile
        searchButton
      />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    </div>
  );
}

export default DoneRecipes;
