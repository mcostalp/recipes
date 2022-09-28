import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import RecipeCardMeal from './RecipeCardMeal';
import RecipeCardDrink from './RecipeCardDrink';

function Recipes() {
  const history = useHistory();

  const {
    pageState,
    response,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(response)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else if (res.length === 1) {
          const id = Object.values(res[0])[0];
          const page = title.toLowerCase();
          history.push(`/${page}/${id}`);
        }
      });
  }, [response]);

  return (
    <div>
      {pageState === 'meals-all' ? <RecipeCardMeal /> : <RecipeCardDrink />}
    </div>
  );
}

export default Recipes;
