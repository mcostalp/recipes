import React, { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../Components/Recipes';

function Meals() {
  const h1Title = 'Meals';
  const {
    setPageState,
  } = useContext(RecipesContext);

  useEffect(() => {
    setPageState('meals-all');
  }, []);

  return (
    <div>
      <Header
        searchButton
        profile
        foods
        h1Title={ h1Title }
      />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
