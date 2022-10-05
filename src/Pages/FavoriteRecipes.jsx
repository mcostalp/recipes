import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import FavCardMeal from '../Components/FavCardMeal';
import FavCardDrink from '../Components/FavCardDrink';

function FavoriteRecipes() {
  const [localFav, setLocalFav] = useState([]);
  const [localFavMeals, setLocalFavMeals] = useState([]);
  const [localFavDrinks, setLocalFavDrinks] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      setLocalFav(favoriteRecipes);
      setFilter(favoriteRecipes);
      const favMeals = favoriteRecipes.filter((meal) => meal.type === 'meal');
      setLocalFavMeals(favMeals);
      const favDrinks = favoriteRecipes.filter((drink) => drink.type === 'drink');
      setLocalFavDrinks(favDrinks);
    }
    console.log(favoriteRecipes);
  }, []);

  const handleFilter = ({ target }) => {
    if (target.value === 'meal') setFilter(localFavMeals);
    else if (target.value === 'drink') setFilter(localFavDrinks);
    else setFilter(localFav);
  };

  const h1Title = 'Favorite Recipes';
  return (
    <div>
      <Header
        h1Title={ h1Title }
        profile
        searchButton
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
              <FavCardMeal key={ index } item={ item } index={ index } />
            );
          }
          return (
            <FavCardDrink
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

export default FavoriteRecipes;
