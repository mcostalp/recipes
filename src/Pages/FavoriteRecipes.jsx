import React from 'react';
import Header from '../Components/Header';

function FavoriteRecipes() {
  const title = 'Favorite Recipes';
  return (
    <div>
      <Header
        title={ title }
        profile
      />
    </div>
  );
}

export default FavoriteRecipes;
