import React, { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../Components/Recipes';

function Drinks() {
  const h1Title = 'Drinks';
  const {
    setPageState,
  } = useContext(RecipesContext);

  useEffect(() => {
    setPageState('drinks-all');
  }, []);

  return (
    <div>
      <Header
        searchButton
        profile
        foods={ false }
        h1Title={ h1Title }
      />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
