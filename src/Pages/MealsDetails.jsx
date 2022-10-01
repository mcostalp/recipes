import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeIngredient from '../Components/RecipeIngredient';
import RecomendationDrinks from '../Components/RecomendationDrinks';
import RecipesContext from '../context/RecipesContext';
import { requestDetails } from '../helpers/Services/apiRequest';

function MealsDetails() {
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const title = 'MealsDetails';

  const {
    pageState,
  } = useContext(RecipesContext);

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDetails(pageState, 'recipeById', id);
      setLocalResp(response[0]);
    };
    fetch();
  }, []);

  useEffect(() => {
    const firstIngredientPosition = Object.keys(localResp)
      .indexOf('strIngredient1');
    const lastIngredientPosition = Object.keys(localResp)
      .indexOf('strIngredient20');
    const fitstMeasurePosition = Object.keys(localResp)
      .indexOf('strMeasure1');
    const lastMeasurePosition = Object.keys(localResp)
      .indexOf('strMeasure20');
    const ingredientValues = Object.values(localResp)
      .slice(firstIngredientPosition, lastIngredientPosition);
    const measureValues = Object.values(localResp)
      .slice(fitstMeasurePosition, lastMeasurePosition);
    setIngredients(ingredientValues.filter((ing) => ing));
    setMeasures(measureValues.filter((meas) => meas !== ' '));
  }, [localResp]);

  return (
    <div>
      <h1>{title}</h1>
      <img
        height="150"
        data-testid="recipe-photo"
        src={ localResp?.strMealThumb }
        alt={ localResp?.strMeal }
      />
      <h3 data-testid="recipe-title">{ localResp?.strMeal }</h3>
      <h4 data-testid="recipe-category">{ localResp?.strCategory }</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${ingredient}: ${measures[index]}`}
          </li>
        ))}
      </ul>
      <fieldset>
        <p data-testid="instructions">{ localResp?.strInstructions }</p>
      </fieldset>
      <div>
        <iframe
          title="Video"
          width="280"
          height="165"
          src={ localResp?.strYoutube?.replace('watch?v=', 'embed/') }
          data-testid="video"
        />
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

      <RecomendationDrinks />
    </div>

  );
}

export default MealsDetails;
