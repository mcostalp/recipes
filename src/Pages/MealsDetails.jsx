import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchApi, requestFetchAll } from '../helpers/Services/apiRequest';

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

  useEffect(() => {
    setResponse(requestFetchAll('recipeById', id));
  }, [pageState, history]);

  return (
    <div>
      <h1>{title}</h1>
      <img
        data-testid="recipe-photo"
        src={ response[0] }
        alt={ response[0] }
      />
      <h2 data-testid="recipe-title">{response[0]}</h2>
      <h3 data-testid="recipe-category">{response[0]}</h3>
      <p data-testid="instructions">{response[0]}</p>
      {/* <iframe
        data-testid="video"
        width="480"
        height="315"
        src={ response[0].replace('watch?v=', 'embed/') }
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
