import React, { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function ShareFavoriteBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = () => {
    const SECOND = 5000;
    setIsVisible(true);
    window.navigator.clipboard.writeText(window.location.href);
    setTimeout(() => { setIsVisible(false); }, SECOND);
  };

  return (
    <>
      <input
        data-testid="share-btn"
        src={ shareIcon }
        type="image"
        alt="share-btn"
        onClick={ handleShare }
      />

      <input
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        type="image"
        alt="favorite-btn"
        onClick={ () => setIsFavorite(!isFavorite) }
      />
      {isVisible && <p>Link copied!</p> }
    </>
  );
}

export default ShareFavoriteBtn;
