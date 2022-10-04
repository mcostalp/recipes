import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecomendationMeals from '../Components/RecomendationMeals';
import ShareFavoriteBtn from '../Components/ShareFavoriteBtn';
import { requestDetails } from '../helpers/Services/apiRequest';

function DrinksDetails() {
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const title = 'DrinksDetails';
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDetails('drinks-all', 'recipeById', id);
      setLocalResp(response[0]);
    };
    fetch();
  }, []);

  useEffect(() => {
    const firstIngredientPosition = Object.keys(localResp)
      .indexOf('strIngredient1');
    const lastIngredientPosition = Object.keys(localResp)
      .indexOf('strIngredient15');
    const fitstMeasurePosition = Object.keys(localResp)
      .indexOf('strMeasure1');
    const lastMeasurePosition = Object.keys(localResp)
      .indexOf('strMeasure15');
    const ingredientValues = Object.values(localResp)
      .slice(firstIngredientPosition, lastIngredientPosition);
    const measureValues = Object.values(localResp)
      .slice(fitstMeasurePosition, lastMeasurePosition);
    setIngredients(ingredientValues.filter((ing) => ing));
    setMeasures(measureValues.filter((meas) => meas !== ' '));
  }, [localResp]);

  return (
    <div className="details-main-content">
      <h1>{title}</h1>

      <div className="recipe-container">
        <img
          height="150"
          data-testid="recipe-photo"
          src={ localResp?.strDrinkThumb }
          alt={ localResp?.strDrink }
        />

        <aside>
          <h3 data-testid="recipe-title">{ localResp?.strDrink }</h3>
          <h4 data-testid="recipe-category">
            { localResp?.strCategory }
            {`${localResp?.strCategory}
      ${localResp?.strAlcoholic === 'Alcoholic' ? '- Alcoholic' : ''}`}

          </h4>
          <ShareFavoriteBtn />
        </aside>

      </div>

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
          width="150"
          height="100"
          src={ localResp?.strYoutube?.replace('watch?v=', 'embed/') }
          data-testid="video"
        />
      </div>
      <RecomendationMeals />

      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn btn"
        type="button"
        onClick={ () => history.push(`${id}/in-progress`) }
      >
        Start Recipe

      </button>
    </div>
  );
}

export default DrinksDetails;
