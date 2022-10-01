import React, { useEffect, useState } from 'react';
// import RecipesContext from '../context/RecipesContext';
import '../Styles/Recomendation.css';

function Rec() {
  const [drinks, setDrinks] = useState([]);
  // const {
  //   pageState,
  // } = useContext(RecipesContext);

  const MAGIC_NUMBER = 6;

  useEffect(() => {
    Promise.resolve(drinks)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else {
          setDrinks(res);
        }
      });
  }, [drinks]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setDrinks(data.drinks.slice(0, MAGIC_NUMBER)));
  }, []);
  return (
    <>
      <h1>Recomentations</h1>
      <div className="recomend-main-container">
        {drinks.map((drink, index) => (
          <span
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <img src={ drink.strDrinkThumb } alt="" height="150" />
            <h4 data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</h4>
          </span>
        ))}
      </div>
    </>
  );
}

export default Rec;
