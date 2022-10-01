import React, { useEffect, useState } from 'react';
import '../Styles/Recomendation.css';

function RecomendationMeals() {
  const [meals, setMeals] = useState([]);
  // const {
  //   pageState,
  // } = useContext(RecipesContext);

  const MAGIC_NUMBER = 6;

  useEffect(() => {
    Promise.resolve(meals)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else {
          setMeals(res);
        }
      });
  }, [meals]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setMeals(data.meals.slice(0, MAGIC_NUMBER)));
  }, []);
  return (
    <>
      <h1>Recomentations</h1>
      <div className="recomend-main-container">
        {meals.map((meal, index) => (
          <span
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <img src={ meal.strMealThumb } alt="" height="150" />
            <h4 data-testid={ `${index}-recommendation-title` }>{meal.strMeal}</h4>
          </span>
        ))}
      </div>
    </>
  );
}

export default RecomendationMeals;
