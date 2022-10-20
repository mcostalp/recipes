import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { requestFetchAll, requestCategoryButtons } from '../helpers/Services/apiRequest';

export default function RecipesProvider({ children }) {
  const history = useHistory();
  const [radioForm, setRadioForm] = useState('');
  const [nameForm, setNameForm] = useState('');
  const [pageType, setPageType] = useState('');
  const [response, setResponse] = useState([]);
  const [pageState, setPageState] = useState('meals-all');
  const [categoryBtns, setCategoryBtns] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [detailResponse, setDetailResponse] = useState([]);
  const [check, setCheck] = useState([]);

  // const mail

  useEffect(() => {
    setResponse(requestFetchAll(pageState, 'allRecipesList'));
    setCategoryBtns(requestCategoryButtons(pageState, 'categoryListBtns'));
  }, [pageState]);

  useEffect(() => {
    setUserEmail({ email: 'email@mail.com' });
  }, []);

  const dataSwitch = (compare, func) => {
    switch (compare) {
    case 'meals-all':
      func();
      break;
    case 'drinks-all':
      func();
      break;
    case 'drink':
      func();
      break;
    default:
      break;
    }
  };

  const contextValue = {
    radioForm,
    setRadioForm,
    nameForm,
    setNameForm,
    pageType,
    setPageType,
    response,
    setResponse,
    pageState,
    setPageState,
    dataTreatement,
    dataSwitch,
    categoryBtns,
    setCategoryBtns,
    userEmail,
    setUserEmail,
    detailResponse,
    setDetailResponse,
    check,
    setCheck,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
