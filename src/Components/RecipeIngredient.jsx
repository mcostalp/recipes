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
      if (ingredient.innerText === '' || ingredient.innerText === 'null null') {
        ingredient.remove();
      }
    });
  };
  RemoveLength0();
  // ${recipe.strMeasure}
  return (
    <div>
      {
        localResp.map((recipe, index) => (
          <ul key={ index }>
            <li
              data-testid="0-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure1} ${recipe.strIngredient1}`}

            </li>

            <li
              data-testid="1-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure2} ${recipe.strIngredient2}`}

            </li>

            <li
              data-testid="2-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure3} ${recipe.strIngredient3}`}

            </li>

            <li
              data-testid="3-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure4} ${recipe.strIngredient4}`}
            </li>

            <li
              data-testid="4-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure5} ${recipe.strIngredient5}`}
            </li>

            <li
              data-testid="5-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure6} ${recipe.strIngredient6}`}
            </li>

            <li
              data-testid="6-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure7} ${recipe.strIngredient7}`}
            </li>

            <li
              data-testid="7-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure8} ${recipe.strIngredient8}`}
            </li>

            <li
              data-testid="8-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure9} ${recipe.strIngredient9}`}
            </li>

            <li
              data-testid="9-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure10} ${recipe.strIngredient10}`}
            </li>

            <li
              data-testid="10-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure11} ${recipe.strIngredient11}`}
            </li>

            <li
              data-testid="11-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure12} ${recipe.strIngredient12}`}
            </li>

            <li
              data-testid="12-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure13} ${recipe.strIngredient13}`}
            </li>

            <li
              data-testid="13-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure14} ${recipe.strIngredient14}`}
            </li>

            <li
              data-testid="14-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure15} ${recipe.strIngredient15}`}
            </li>

            <li
              data-testid="15-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure16} ${recipe.strIngredient16}`}
            </li>

            <li
              data-testid="16-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure17} ${recipe.strIngredient17}`}
            </li>

            <li
              data-testid="17-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure18} ${recipe.strIngredient18}`}
            </li>

            <li
              data-testid="18-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure19} ${recipe.strIngredient19}`}
            </li>

            <li
              data-testid="19-ingredient-name-and-measure"
            >
              {`${recipe.strMeasure20} ${recipe.strIngredient20}`}
            </li>
          </ul>
        ))
      }

    </div>
  );
}

export default RecipeIngredient;
