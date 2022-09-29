import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { requestDetails } from '../helpers/Services/apiRequest';

function MealsDetails() {
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const title = 'MealsDetails';
  const history = useHistory();

  const {
    response,
    pageState,
    setResponse,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(response)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else {
          setLocalResp(res);
        }
      });
  }, [response]);

  const recipe = Object.values(response)[0];

  useEffect(() => {
    setResponse(requestDetails(pageState, 'recipeById', id));
    console.log(recipe);
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <img
        data-testid="recipe-photo"
        src={ recipe }
        alt={ localResp[0] }
      />
      <h2 data-testid="recipe-title">{localResp[0]}</h2>
      <h3 data-testid="recipe-category">{localResp[0]}</h3>
      <p data-testid="instructions">{localResp[0]}</p>
      {/* <iframe
        data-testid="video"
        width="480"
        height="315"
        src={ localResp[0].replace('watch?v=', 'embed/') }
        title="YouTube video player"
        frameBorder="0"
        allow={ `accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture` }
        allowFullScreen
  /> */}
    </div>
  );
}

export default MealsDetails;
