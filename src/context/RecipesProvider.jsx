import React from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipesContext';

function RecipesProvider({ children }) {
  // const context = { }

  return (
    <RecipeContext.Provider>
      {children}
    </RecipeContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
