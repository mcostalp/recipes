import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DrinkInProgress from '../Components/DrinkInProgress';
import MealInProgress from '../Components/MealInProgress';

function RecipeInProgress() {
  const { location } = useHistory();
  const { pathname } = location;
  const valid = pathname.indexOf('meal') >= 0;

  useEffect(() => {}, []);

  return (
    <div>
      {valid ? <MealInProgress /> : <DrinkInProgress />}
    </div>
  );
}

export default RecipeInProgress;
