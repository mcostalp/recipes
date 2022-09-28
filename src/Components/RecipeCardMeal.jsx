import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

const MAX_ARRAY_LENGTH = 12;

function RecipeCardMeal() {
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
