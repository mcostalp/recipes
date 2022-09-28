import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

const MAX_ARRAY_LENGTH = 12;

function RecipeCardDrink() {
  const [resp, setResp] = useState([]);

  const {
    response,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(response)
      .then((res) => setResp(res));
  }, [response, resp]);

  return (
    <div>
      {resp !== null ? resp
        .slice(0, MAX_ARRAY_LENGTH).map((item, index) => (
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
