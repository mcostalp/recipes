import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import { requestDetails } from '../helpers/Services/apiRequest';

function ShareFavoriteBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [localResp, setLocalResp] = useState({});
  const [storage, setStorage] = useState({});
  const { id } = useParams();

  const shareFunc = () => {
    const SECONDS = 5000;
    navigator.clipboard.writeText(window.location.href);
    setIsVisible(true);
    setTimeout(() => { setIsVisible(false); }, SECONDS);
  };

  const favoriteMeal = () => {
    setStorage({
      id: localResp.idMeal,
      type: localResp.strTags,
      nationality: localResp.strArea,
      category: localResp.strCategory,
      alcoholicOrNot: false,
      name: localResp.strMeal,
      image: localResp.strMealThumb,
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
  };

  const {
    pageState,
  } = useContext(RecipesContext);

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDetails(pageState, 'recipeById', id);
      setLocalResp(response[0]);
      favoriteMeal();
    };
    fetch();
  }, []);

  return (
    <>
      <input
        data-testid="share-btn"
        src={ shareIcon }
        type="image"
        alt="share-btn"
        onClick={ shareFunc }
      />

      <input
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        type="image"
        alt="favorite-btn"
        onClick={ () => {
          favoriteMeal();
          setIsFavorite(!isFavorite);
        } }
      />

      {isVisible && <p>Link copied!</p>}
    </>
  );
}

export default ShareFavoriteBtn;
