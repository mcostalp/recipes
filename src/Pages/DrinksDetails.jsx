import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecomendationMeals from '../Components/RecomendationMeals';
// import ShareFavoriteBtn from '../Components/ShareFavoriteBtn';
import { requestDetails } from '../helpers/Services/apiRequest';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

function DrinksDetails() {
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const title = 'DrinksDetails';
  const history = useHistory();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const [copiedLink, setCopiedLink] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(true);
  const [recipeInProgress, setRecipeInProgress] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDetails('drinks-all', 'recipeById', id);
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

  const clipCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopiedLink(true);
  };

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

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === id));
  }, []);

  const onFavoriteCheck = () => {
    const newFavorite = {
      id: localResp.idDrink,
      type: 'drink',
      nationality: '',
      category: localResp.strCategory,
      alcoholicOrNot: localResp.strAlcoholic === 'Alcoholic' ? 'Alcoholic' : '',
      name: localResp.strDrink,
      image: localResp.strDrinkThumb,
    };
    const saved = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
          </h4>

          {/* <ShareFavoriteBtn /> */}
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
      {recipeFinished && <div>{recipeInProgress ? continueBtn : startBtn}</div>}
    </div>
  );
}

export default DrinksDetails;
