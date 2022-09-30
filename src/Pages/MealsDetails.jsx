import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeIngredient from '../Components/RecipeIngredient';
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
  console.log(localResp[0]);

  return (
    <section>
      <div>
        <h1>{title}</h1>
      </div>
      {localResp.length === 1
        ? localResp
          .map((ingredient, index) => (
            // const youtubeCharacters = 32;
            // const removeWatchLink = ingredient.srtYoutube
            //   .substring(youtubeCharacters);
            <div key={ index }>
              <img
                data-testid="recipe-photo"
                src={ ingredient.strMealThumb }
                alt={ ingredient.strMeal }
                width="100px"
              />
              <h2 data-testid="recipe-title">{ingredient.strMeal}</h2>
              <h3 data-testid="recipe-category">{ingredient.strCategory}</h3>
              <p />
              <p data-testid="instructions">{ingredient.strInstructions}</p>

              <RecipeIngredient />

              <iframe
                width="230"
                height="170"
                src="https://www.youtube.com/embed/1IszT_guI08"
                title="YouTube video player"
                data-testid="video"
              />
            </div>
          )) : []}
    </section>

  );
}

export default MealsDetails;
