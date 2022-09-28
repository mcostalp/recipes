import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const history = useHistory();
  const title = 'Drinks';
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
      />
      {resp.length > 0 && resp.map((item) => (
        <div key={ item.strDrink }>
          <h2>{item.strDrink}</h2>
          <img src={ item.strDrinkThumb } alt={ item.strDrink } />
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Drinks;
