import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchApi } from '../helpers/Services/apiRequest';

export default function RecipesProvider({ children }) {
  // const context = { }
  const [radioForm, setRadioForm] = useState('');
  const [nameForm, setNameForm] = useState('');
  const [pageType, setPageType] = useState('');
  const [response, setResponse] = useState([]);

  const contextValue = {
    radioForm,
    setRadioForm,
    nameForm,
    setNameForm,
    pageType,
    setPageType,
    response,
    setResponse,
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
