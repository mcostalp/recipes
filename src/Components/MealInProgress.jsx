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
    setInProgressLocalStorage] = useLocalStorage('inProgressRecipes', []);
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDetails('meals-all', 'recipeById', id);
      setLocalResp(response[0]);
      console.log(response[0]);
    };
    fetch();
    console.log(doneLocalStorage);
    // const saved = JSON.parse(localStorage.getItem('doneRecipes'));
    // const localSave = localDone;
    // if (saved !== null) {
    //   setLocalDone([...saved, ...localSave]);
    // }
  }, []);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(inProgressLocalStorage, doneLocalStorage);
    Object.keys(inProgress).forEach((key) => {
      if (key === id) {
        setCheck(inProgress[key]);
      }
    });
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

  const onCheckClick = (({ target }) => {
    if (check.length === 0 || target.checked) {
      const localCheck = [...check,
        target.value];
      setCheck(localCheck);
      setInProgressLocalStorage({ [id]: localCheck });
    } else {
      const newCheckArr = check.filter((ch) => ch !== target.value);
      setCheck(newCheckArr);
      setInProgressLocalStorage({ [id]: newCheckArr });
    }
    console.log(inProgressLocalStorage);
    console.log(target.value);
  });

  const clipCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    setCopiedLink(true);
  };

  const onFinishBtnClick = async () => {
    const newDoneRecipe = {
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
    };
    const saved = doneLocalStorage;
    await setDoneLocalStorage([...saved, newDoneRecipe]);
    history.push('/done-recipes');
  };

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === id));
  }, []);

  const onFavoriteCheck = () => {
    const newFavorite = {
      id: localResp.idMeal,
      type: 'meal',
      nationality: localResp.strArea,
      category: localResp.strCategory,
      alcoholicOrNot: '',
      name: localResp.strMeal,
      image: localResp.strMealThumb,
    };
    const saved = favorites;
    if (saved !== null && isFavorite === false) {
      setFavorites([...saved, newFavorite]);
      setIsFavorite(true);
    } else if (saved !== null && isFavorite !== false) {
      const newArr = saved.filter((fav) => fav.id !== id);
      setFavorites(newArr);
      setIsFavorite(false);
    }
  };

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
        onClick={ onFavoriteCheck }
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
              name={ ingredient }
              value={ ingredient }
              onChange={ onCheckClick }
              checked={ check.includes(ingredient) }
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
