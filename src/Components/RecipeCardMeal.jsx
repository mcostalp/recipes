import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  requestCategoryListItems,
  requestFetchAll,
} from '../helpers/Services/apiRequest';
import '../Styles/RecipeCard.css';

const MAX_ITEM_LENGTH = 12;
const MAX_BTN_LENGTH = 5;

function RecipeCardMeal() {
  const [resp, setResp] = useState([]);
  const [btns, setBtns] = useState([]);
  const [togleBtn, setTogleBtn] = useState('');

  const history = useHistory();

  const {
    response,
    categoryBtns,
    pageState,
    setResponse,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(response)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else if (res.length === 1 && togleBtn !== 'Goat') {
          const title = pageState === 'meals-all' ? 'meals' : 'drinks';
          const id = Object.values(res[0])[0];
          const page = title.toLowerCase();
          history.push(`/${page}/${id}`);
        } else {
          setResp(res);
        }
      });
  }, [response]);

  useEffect(() => {
    Promise.resolve(categoryBtns)
      .then((btn) => setBtns(btn));
  }, [categoryBtns]);

  const onBtnClick = ({ target }) => {
    const { name } = target;
    if (name === togleBtn) {
      setTogleBtn('');
      setResponse(requestFetchAll(pageState, 'allRecipesList'));
    } else {
      setTogleBtn(name);
      setResponse(requestCategoryListItems(pageState, name, 'categoryListItems'));
    }
  };

  const onAllBtnClick = () => {
    setTogleBtn('name');
    setResponse(requestFetchAll(pageState, 'allRecipesList'));
  };

  return (
    <>
      <div className="filter-btns">
        <button
          className="btn"
          type="button"
          data-testid="All-category-filter"
          name="All-category-filter"
          onClick={ onAllBtnClick }
        >
          All
        </button>
        {btns
          .slice(0, MAX_BTN_LENGTH).map((item, index) => (
            <button
              className="btn"
              type="button"
              key={ index }
              data-testid={ `${item.strCategory}-category-filter` }
              name={ item.strCategory }
              onClick={ onBtnClick }
            >
              {item.strCategory}
            </button>))}

      </div>

      <div className="recipe-card-main-container">
        <div className="bg-cards" />
        {resp !== null ? resp
          .slice(0, MAX_ITEM_LENGTH).map((item, index) => (
            <Link key={ index } to={ `/meals/${item.idMeal}` }>
              <div className="meal" data-testid={ `${index}-recipe-card` }>
                <img
                  height="150"
                  data-testid={ `${index}-card-img` }
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                />
                <div className="recipe-card">
                  <h2 data-testid={ `${index}-card-name` }>{item.strMeal}</h2>
                </div>
              </div>
            </Link>)) : []}
      </div>
    </>
  );
}

export default RecipeCardMeal;
