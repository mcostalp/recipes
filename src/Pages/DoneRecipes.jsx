import React from 'react';
import Header from '../Components/Header';

function DoneRecipes() {
  const h1Title = 'Done Recipes';
  return (
    <div>
      <Header
        h1Title={ h1Title }
        profile
      />
    </div>
  );
}

export default DoneRecipes;
