import React from 'react';

function ShareFavoriteBtn() {
  return (
    <>
      <img
        data-testid="share-btn"
        src="https://img.icons8.com/ios/45/000000/share--v1.png"
        type="button"
        alt="share-btn"
      />

      <img
        data-testid="favorite-btn"
        src="https://img.icons8.com/ios/50/000000/like.png"
        type="button"
        alt="favorite-btn"
      />
    </>
  );
}

export default ShareFavoriteBtn;
