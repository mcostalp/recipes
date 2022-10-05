import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavCardMeal({ item, index }) {
  const history = useHistory();
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);

  const clipCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${item.id}`);
    setCopiedLink(true);
  };

  const onClick = () => {
    history.push(`/meals/${item.id}`);
  };

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
    <div>
      <Link to={ `/meals/${item.id}` }>
        <img
          src={ item.image }
          alt={ item.name }
          className="recipeIMG"
          data-testid={ `${index}-horizontal-image` }
          height="150px"
        />
      </Link>
      <h4
        className="recipeName"
        data-testid={ `${index}-horizontal-name` }
        onClick={ onClick }
        onKeyDown={ onClick }
        role="presentation"
      >
        { item.name }
      </h4>
      <h5
        data-testid={ `${index}-horizontal-top-text` }
      >

        { `${item.nationality} - ${item.category}` }
      </h5>
      <input
        type="image"
        alt="shareIcon"
        className="shareIcon"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ clipCopy }
      />
      { copiedLink && <p>Link copied!</p> }
      <input
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
        data-testid="favorite-btn"
        type="image"
        onClick={ onFavoriteCheck }
      />
    </div>
  );
}

FavCardMeal.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape().isRequired,
};
