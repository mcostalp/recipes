import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { requestDetails } from '../helpers/Services/apiRequest';

function MealInProgress() {
  const title = 'Recipe in Progress';
  const [localResp, setLocalResp] = useState('');
  const { id } = useParams();

  const {
    detailResponse,
    setDetailResponse,
    setPageState,
  } = useContext(RecipesContext);

  useEffect(() => {
    setPageState('meals-all');
    setDetailResponse(requestDetails('meals-all', 'recipeById', id));
  }, []);

  useEffect(() => {
    Promise.resolve(detailResponse)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else {
          setLocalResp(res);
        }
      });
  }, [detailResponse]);

  return (
    <section>
      <div>
        <h1>{title}</h1>
      </div>
      {localResp !== '' ? localResp
        .map((resp, index) => (
          <div key={ index }>
            <img
              data-testid="recipe-photo"
              src={ resp.strMealThumb }
              alt={ resp.strMeal }
            />
            <h2 data-testid="recipe-title">{resp.strMeal}</h2>
            <p data-testid="instructions">{resp.strInstructions}</p>
            <button data-testid="share-btn" type="button">
              Share
            </button>
            <button data-testid="favorite-btn" type="button">
              Favorite
            </button>
            <h3 data-testid="recipe-category">{resp.strCategory}</h3>
            <p data-testid="instructions">{resp.strInstructions}</p>
            <button data-testid="finish-recipe-btn" type="button">
              Finish Recipe
            </button>
          </div>)) : ''}
    </section>
  );
}

export default MealInProgress;
