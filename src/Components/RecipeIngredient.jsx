import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { requestDetails } from '../helpers/Services/apiRequest';

function RecipeIngredient() {
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);

  const {
    detailResponse,
    setDetailResponse,
    pageState,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(detailResponse)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else {
          setLocalResp(res);
        }
      });
  }, [detailResponse]);

  useEffect(() => {
    setDetailResponse(requestDetails(pageState, 'recipeById', id));
  }, []);

  const RemoveLength0 = () => {
    const ingredients = Array.from(document.getElementsByTagName('li'));
    ingredients.forEach((ingredient) => {
      if (ingredient.innerText === '') {
        ingredient.remove();
      }
    });
  };
  RemoveLength0();

  return (
    <div>
      {
        localResp.map((recipe, index) => (
          <ul key={ index }>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient1}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient2}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient3}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient4}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient5}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient6}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient7}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient8}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient9}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient10}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient11}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient12}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient13}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient14}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient15}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient16}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient17}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient18}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient19}

            </li>

            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {recipe.strIngredient20}

            </li>
          </ul>
        ))
      }

    </div>
  );
}

export default RecipeIngredient;
