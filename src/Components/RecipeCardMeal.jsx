import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

const MAX_ITEM_LENGTH = 12;
const MAX_BTN_LENGTH = 5;

function RecipeCardMeal() {
  const [resp, setResp] = useState([]);
  const [btns, setBtns] = useState([]);

  const {
    response,
    pageState,
    categoryBtns,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(response)
      .then((res) => setResp(res));
  }, [response, resp, categoryBtns, pageState]);

  useEffect(() => {
    Promise.resolve(categoryBtns)
      .then((btn) => setBtns(btn));
  }, [response, resp, categoryBtns, pageState]);

  return (
    <div>
      {btns
        .slice(0, MAX_BTN_LENGTH).map((item, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${item.strCategory}-category-filter` }
            name={ item.strCategory }
          >
            {item.strCategory}
          </button>))}
      {resp !== null ? resp
        .slice(0, MAX_ITEM_LENGTH).map((item, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <h2 data-testid={ `${index}-card-name` }>{item.strMeal}</h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
          </div>)) : ''}
    </div>
  );
}

export default RecipeCardMeal;
