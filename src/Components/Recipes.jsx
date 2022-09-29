import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import RecipeCardMeal from './RecipeCardMeal';
import RecipeCardDrink from './RecipeCardDrink';

function Recipes() {
  const {
    pageState,
  } = useContext(RecipesContext);

  return (
    <div>
      {pageState === 'meals-all' ? <RecipeCardMeal /> : <RecipeCardDrink />}
    </div>
  );
}

export default Recipes;
