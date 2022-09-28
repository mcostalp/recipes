import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../context/RecipesContext';
import RecipeCardMeal from '../Components/RecipeCardMeal';

function Meals() {
  const history = useHistory();
  const title = 'Meals';

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
        foods
      />
      <RecipeCardMeal />
      <Footer />
    </div>
  );
}

export default Meals;
