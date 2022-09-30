import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { requestDetails } from '../helpers/Services/apiRequest';

function MealsDetails() {
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const title = 'MealsDetails';

  const {
    detailResponse,
    setDetailResponse,
    pageState,
  } = useContext(RecipesContext);

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

  useEffect(() => {
    setDetailResponse(requestDetails(pageState, 'recipeById', id));
  }, []);

  return (
    <section>
      <div>
        <h1>{title}</h1>
      </div>
      {localResp.length === 1 ? localResp
        .map((resp, index) => (
          <div key={ index }>
            <img
              data-testid="recipe-photo"
              src={ resp.strMealThumb }
              alt={ resp.strMeal }
            />
            <h2 data-testid="recipe-title">{resp.strMeal}</h2>
            <h3 data-testid="recipe-category">{resp.strCategory}</h3>
            <p data-testid="instructions">{resp.strInstructions}</p>
          </div>)) : []}
    </section>

  );
}

export default MealsDetails;
