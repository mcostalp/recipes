import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestDetails } from '../helpers/Services/apiRequest';

function MealInProgress() {
  const title = 'Recipe in Progress';
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDetails('meals-all', 'recipeById', id);
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
        data-testid="recipe-photo"
        src={ localResp?.strMealThumb }
        alt={ localResp?.strMeal }
      />
      <h3 data-testid="recipe-title">{ localResp?.strMeal }</h3>
      <button data-testid="share-btn" type="button">
        Share
      </button>
      <button data-testid="favorite-btn" type="button">
        Favorite
      </button>
      <h4 data-testid="recipe-category">
        { localResp?.strCategory }
      </h4>
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
          width="200"
          height="100"
          src={ localResp?.strYoutube?.replace('watch?v=', 'embed/') }
          data-testid="video"
        />
      </div>
      <button data-testid="finish-recipe-btn" type="button">
        Finish Recipe
      </button>
    </div>
  );
}

export default MealInProgress;
