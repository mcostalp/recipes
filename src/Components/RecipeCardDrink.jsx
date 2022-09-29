import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const MAX_ITEM_LENGTH = 12;
const MAX_BTN_LENGTH = 5;

function RecipeCardDrink() {
  const [resp, setResp] = useState([]);
  const [btns, setBtns] = useState([]);

  const history = useHistory();

  const {
    response,
    categoryBtns,
    pageState,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(response)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else if (res.length === 1) {
          const title = pageState === 'meals-all' ? 'meals' : 'drinks';
          const id = Object.values(res[0])[0];
          const page = title.toLowerCase();
          history.push(`/${page}/${id}`);
        } else {
          setResp(res);
        }
      });
  }, [response]);

  useEffect(() => {
    Promise.resolve(categoryBtns)
      .then((btn) => setBtns(btn));
  }, [categoryBtns]);

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
            <h2 data-testid={ `${index}-card-name` }>{item.strDrink}</h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
          </div>)) : ''}
    </div>
  );
}

export default RecipeCardDrink;
