import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeIngredient from '../Components/RecipeIngredient';
import RecipesContext from '../context/RecipesContext';
import { requestDetails } from '../helpers/Services/apiRequest';

function DrinksDetails() {
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const title = 'DrinksDetails';

  const {
    detailResponse,
    setDetailResponse,
    setPageState,
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
    setPageState(title);
    setDetailResponse(requestDetails('drinks-all', 'recipeById', id));
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
              src={ resp.strDrinkThumb }
              alt={ resp.strDrink }
            />
            <h2 data-testid="recipe-title">{resp.strDrink}</h2>
            <h3 data-testid="recipe-category">{resp.strCategory}</h3>
            <h5>{resp.strAlcoholic}</h5>
            <p data-testid="instructions">{resp.strInstructions}</p>
            <RecipeIngredient />
          </div>)) : []}
    </section>

  );
}

export default DrinksDetails;
