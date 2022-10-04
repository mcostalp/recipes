import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import DoneCardMeal from '../Components/DoneCardMeal';
import DoneCardDrink from '../Components/DoneCardDrink';

function DoneRecipes() {
  const [localDone, setLocalDone] = useState([]);
  const [localDoneMeals, setLocalDoneMeals] = useState([]);
  const [localDoneDrinks, setLocalDoneDrinks] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes !== null) {
      setLocalDone(doneRecipes);
      setFilter(doneRecipes);
      const doneMeals = doneRecipes.filter((meal) => meal.type === 'meal');
      setLocalDoneMeals(doneMeals);
      const doneDrinks = doneRecipes.filter((drink) => drink.type === 'drink');
      setLocalDoneDrinks(doneDrinks);
    }
    console.log(doneRecipes);
  }, []);

  const handleFilter = ({ target }) => {
    if (target.value === 'meal') setFilter(localDoneMeals);
    else if (target.value === 'drink') setFilter(localDoneDrinks);
    else setFilter(localDone);
  };

  const h1Title = 'Done Recipes';
  return (
    <div>
      <Header
        h1Title={ h1Title }
        profile
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="All"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value="meal"
          onClick={ handleFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>
      <ul>
        {filter.map((item, index) => {
          if (item?.type === 'meal') {
            return (
              <DoneCardMeal key={ index } item={ item } index={ index } />
            );
          }
          return (
            <DoneCardDrink
              key={ index }
              item={ item }
              index={ index }
            />
          );
        })}
      </ul>
    </div>
  );
}

export default DoneRecipes;
