import React from 'react';
import Header from '../Components/Header';

function DoneRecipes() {
  const title = 'Done Recipes';
  return (
    <div>
      <Header
        title={ title }
        profile
      />
    </div>
  );
}

export default DoneRecipes;
