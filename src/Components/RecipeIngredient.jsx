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

  return (
    <div>
      {
        localResp.map((recipe, index) => (
          <ul key={ index }>
            <li>{recipe.strIngredient1}</li>
            <li>{recipe.strIngredient2}</li>
            <li>{recipe.strIngredient3}</li>
            <li>{recipe.strIngredient4}</li>
            <li>{recipe.strIngredient5}</li>
            {/* <li>{recipe.strIngredient6}</li>
            <li>{recipe.strIngredient8}</li>
            <li>{recipe.strIngredient9}</li>
            <li>{recipe.strIngredient10}</li>
            <li>{recipe.strIngredient11}</li>
            <li>{recipe.strIngredient12}</li>
            <li>{recipe.strIngredient13}</li>
            <li>{recipe.strIngredient14}</li>
            <li>{recipe.strIngredient15}</li>
            <li>{recipe.strIngredient16}</li>
            <li>{recipe.strIngredient17}</li>
            <li>{recipe.strIngredient18}</li>
            <li>{recipe.strIngredient19}</li>
            <li>{recipe.strIngredient20}</li> */}
          </ul>
        ))
      }
    </div>
  );
}

export default RecipeIngredient;
