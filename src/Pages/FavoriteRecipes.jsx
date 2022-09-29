import React from 'react';
import Header from '../Components/Header';

function FavoriteRecipes() {
  const h1Title = 'Favorite Recipes';
  return (
    <div>
      <Header
        h1Title={ h1Title }
        profile
      />
    </div>
  );
}

export default FavoriteRecipes;
