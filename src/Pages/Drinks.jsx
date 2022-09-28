import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../context/RecipesContext';
import RecipeCardDrink from '../Components/RecipeCardDrink';

function Drinks() {
  const history = useHistory();
  const title = 'Drinks';

  const {
    response,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(response)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else if (res.length === 1) {
          const id = Object.values(res[0])[0];
          const page = title.toLowerCase();
          history.push(`/${page}/${id}`);
        }
      });
  }, [response, history]);

  return (
    <div>
      <Header
        searchButton
        title={ title }
        profile
        foods={ false }
      />
      <RecipeCardDrink />
      <Footer />
    </div>
  );
}

export default Drinks;
