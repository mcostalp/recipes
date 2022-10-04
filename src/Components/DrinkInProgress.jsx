import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { requestDrinkInProgress } from '../helpers/Services/apiRequest';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import '../Styles/DrinkInProgress.css';
import '../Styles/MealsDetails.css';

function DrinkInProgress() {
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

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDrinkInProgress(id);
      setLocalResp(response[0]);
    };
    fetch();
  }, []);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(inProgressLocalStorage);
    Object.keys(inProgress).forEach((key) => {
      if (key === id) {
        setCheck(inProgress[key]);
      }
    });
  }, []);

  useEffect(() => {
    const minMeasureLength = 3;
    const firstIngredientPosition = Object.keys(localResp)
      .indexOf('strIngredient1');
    const lastIngredientPosition = Object.keys(localResp)
      .indexOf('strIngredient14');
    const fitstMeasurePosition = Object.keys(localResp)
      .indexOf('strMeasure1');
    const lastMeasurePosition = Object.keys(localResp)
      .indexOf('strMeasure14');
    const ingredientValues = Object.values(localResp)
      .slice(firstIngredientPosition, lastIngredientPosition);
    const measureValues = Object.values(localResp)
      .slice(fitstMeasurePosition, lastMeasurePosition);
    setMeasures(measureValues
      .filter((meas) => meas !== '' && meas !== null && meas.length > minMeasureLength));
    setIngredients(ingredientValues.filter((ing) => ing));
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
    console.log(!check.includes(target.value));
    console.log(target.value);
  });

  const clipCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopiedLink(true);
  };

  const onFinishBtnClick = () => {
    const newDoneRecipe = [...doneLocalStorage,
      {
        id: localResp.idDrink,
        type: 'drink',
        nationality: localResp.strArea,
        category: localResp.strCategory,
        alcoholicOrNot: localResp.strAlcoholic === 'Alcoholic' ? 'Alcoholic' : '',
        name: localResp.strDrink,
        image: localResp.strDrinkThumb,
        doneDate: Date(),
        tags: localResp.strTags !== null ? localResp.strTags
          .split(',') : '',
      }];
    setDoneLocalStorage(newDoneRecipe);
    history.push('/done-recipes');
  };

  return (
    <div details-main-content>
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
            {`${localResp?.strCategory}
      ${localResp?.strAlcoholic === 'Alcoholic' ? '- Alcoholic' : ''}`}

          </h4>
        </aside>

      </div>

      <ul className="ol-container">
        {ingredients.map((ingredient, index) => (
          <label
            htmlFor={ ingredients[index] }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              id={ ingredients[index] }
              type="checkbox"
              value={ ingredients[index] }
              onChange={ onCheckClick }
              checked={ check.includes(ingredient) }
            />

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
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
        disabled={ measures.length !== check.length }
        onClick={ onFinishBtnClick }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default DrinkInProgress;
