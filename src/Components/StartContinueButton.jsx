import React, { useEffect, useState } from 'react';

function StartContinueButton() {
  const [localResp, setLocalResp] = useState([]);
  // const {
  //   pageState,
  // } = useContext(RecipesContext);

  useEffect(() => {
    const fetch = async () => {
      const response = await requestDetails('meals-all', 'recipeById', id);
      setLocalResp(response[0]);
    };
    fetch();
  }, []);

  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      disabled={ ingredients.length !== check.length }
      onClick={ onFinishBtnClick }
    >
      Finish Recipe
    </button>
  );
}

export default StartFinishButton;
