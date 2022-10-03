import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { requestDrinkInProgress } from '../helpers/Services/apiRequest';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDrinkInProgress(id);
      setLocalResp(response[0]);
    };
    fetch();
  }, []);

  useEffect(() => {
    const minMeasureLength = 3;
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
    setMeasures(measureValues
      .filter((meas) => meas !== '' && meas !== null && meas.length > minMeasureLength));
    setIngredients(ingredientValues.filter((ing) => ing));
  }, [localResp]);

  useEffect(() => {
    console.log(ingredients, measures);
  }, [ingredients, measures]);

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
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopiedLink(true);
  };

  const onFinishBtnClick = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      <h1>{title}</h1>
      <img
        height="150"
        data-testid="recipe-photo"
        src={ localResp?.strDrinkThumb }
        alt={ localResp?.strDrink }
      />
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
      <ul>
        {measures.map((measure, index) => (
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
            />
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`${ingredients[index]}: ${measures[index]}`}
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
