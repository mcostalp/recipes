import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const history = useHistory();
  const title = 'Meals';
  const [resp, setResp] = useState([]);
  const {
    response,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(response)
      .then((res) => {
        if (res.length === 1) {
          const id = Object.values(res[0])[0];
          const page = title.toLowerCase();
          history.push(`/${page}/${id}`);
        } else {
          setResp(res);
        }
      });
  }, [response, resp]);

  return (
    <div>
      <Header
        searchButton
        title={ title }
        profile
        foods
      />
      {resp.length > 0 && resp.map((item) => (
        <div key={ item.strMeal }>
          <h2>{item.strMeal}</h2>
          <img src={ item.strMealThumb } alt={ item.strMeal } />
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Meals;
