import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import RecipeIngredient from '../Components/RecipeIngredient';
import RecomendationMeals from '../Components/RecomendationDrinks';
import ShareFavoriteBtn from '../Components/ShareFavoriteBtn';
// import RecipesContext from '../context/RecipesContext';
import { requestDetails } from '../helpers/Services/apiRequest';
import '../Styles/MealsDetails.css';

function MealsDetails() {
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recipeFinished, setRecipeFinished] = useState(true);
  const [recipeInProgress, setRecipeInProgress] = useState(true);
  const title = 'MealsDetails';
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDetails('meals-all', 'recipeById', id);
      setLocalResp(response[0]);
    };
    fetch();
    setRecipeFinished(true);
    setRecipeInProgress(true);
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

  const startBtn = (
    <div>
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`${id}/in-progress`) }
        value="Start Recipe"
      >
        Start Recipe
      </button>
    </div>
  );

  const continueBtn = (
    <div>
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`${id}/in-progress`) }
        value="Continue Recipe"
      >
        Continue Recipe
      </button>
    </div>
  );

  // useEffect(() => {
  //  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //  if (inProgressRecipes !== null) {
  //    if (Object.keys(inProgressRecipes).includes(id)) {
  //      setRecipeInProgress(true);
  //    }
  //  }
  //  if (doneRecipes !== null) {
  //    if (Object.keys(doneRecipes).includes(id)) {
  //      setRecipeFinished(true);
  //    }
  //  }
  // }, []);

  return (
    <div className="details-main-content">
      <h1>{title}</h1>

      <div className="recipe-container">
        <img
          height="150"
          data-testid="recipe-photo"
          src={ localResp?.strMealThumb }
          alt={ localResp?.strMeal }
        />
        <aside>
          <h3 data-testid="recipe-title">{ localResp?.strMeal }</h3>
          <h4 data-testid="recipe-category">{ localResp?.strCategory }</h4>
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
          width="280"
          height="165"
          src={ localResp?.strYoutube?.replace('watch?v=', 'embed/') }
          data-testid="video"
        />
      </div>
      <RecomendationMeals />
      {recipeFinished && <div>{recipeInProgress ? continueBtn : startBtn}</div>}
    </div>

  );
}

export default MealsDetails;
