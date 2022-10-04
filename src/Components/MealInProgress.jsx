import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { requestDetails } from '../helpers/Services/apiRequest';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

function MealInProgress() {
  const title = 'Recipe in Progress';
  const history = useHistory();
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [check, setCheck] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [doneLocalStorage, setDoneLocalStorage] = useLocalStorage('doneRecipes', []);
  const [inProgressLocalStorage,
    setInProgressLocalStorage] = useLocalStorage('inProgressRecipes', {
    drinks: {
      id: [ingredients],
    },
    meals: {
      id: [ingredients],
    },
  });

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
    setMeasures(measureValues.filter((meas) => meas !== '' && meas !== null));
  }, [localResp]);

  useEffect(() => {
    console.log(history.location);
    console.log(localResp);
  }, [ingredients, measures, check]);

  const onCheckClick = (({ target }) => {
    if (check.length === 0 || target.checked) {
      setCheck([...check,
        target.value]);
    } else {
      const newCheckArr = check.filter((ch) => ch !== target.value);
      setCheck(newCheckArr);
    }
    console.log(target.value);
  });

  const clipCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    setCopiedLink(true);
  };

  const onFinishBtnClick = () => {
    const newDoneRecipe = [...doneLocalStorage,
      {
        id: localResp.idMeal,
        type: 'meal',
        nationality: localResp.strArea,
        category: localResp.strCategory,
        alcoholicOrNot: '',
        name: localResp.strMeal,
        image: localResp.strMealThumb,
        doneDate: Date(),
        tags: localResp.strTags !== null ? localResp.strTags
          .split(',') : '',
      }];
    setDoneLocalStorage(newDoneRecipe);
    // localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipe));
    // history.push('/done-recipes');
  };

  const inProgressIngredients = [...inProgressLocalStorage, {
    drinks: {
      drinkID: [id],
    },
    meals: {
      mealID: [id],

    },
  }];

  setInProgressLocalStorage(inProgressIngredients);

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

      <input
        src={ shareIcon }
        alt="share"
        data-testid="share-btn"
        type="image"
        onClick={ clipCopy }
      />
      {copiedLink && <p>Link copied!</p>}

      <input
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
        data-testid="favorite-btn"
        type="image"
        onClick={ () => setIsFavorite(!isFavorite) }
      />

      <h4 data-testid="recipe-category">
        { localResp?.strCategory }
      </h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <label
            htmlFor={ ingredient }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              id={ ingredient }
              type="checkbox"
              value={ ingredient }
              onChange={ onCheckClick }

            />
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              id={ ingredient }
              values={ ingredient }
            >
              {`${ingredient}: ${measures[index]}`}
            </li>
          </label>
        ))}
      </ul>
      <fieldset>
        <p data-testid="instructions">{ localResp?.strInstructions }</p>
      </fieldset>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ ingredients.length !== check.length }
        onClick={ onFinishBtnClick }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default MealInProgress;
