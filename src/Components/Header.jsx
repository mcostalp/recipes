import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchApi } from '../helpers/Services/apiRequest';
import RecipesContext from '../context/RecipesContext';

function Header({ title, profile, searchButton, foods }) {
  const history = useHistory();
  const [inputState, setInputState] = useState(false);
  const [name, setName] = useState('');

  const {
    setResponse,
  } = useContext(RecipesContext);

  const onImgClick = () => {
    if (inputState) {
      setInputState(false);
    } else {
      setInputState(true);
    }
  };

  const onChange = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const onBtnClick = (e) => {
    e.preventDefault();
    const { target } = e;
    const filtro = Object.values(target).find((element) => element.checked);
    const textValue = target[0].value;
    if (foods) {
      const responseApi = fetchApi('foods', filtro.value, textValue);
      setResponse(responseApi);
    } else {
      const responseApi = fetchApi('drinks', filtro.value, textValue);
      setResponse(responseApi);
    }
  };

  const searchImg = (<input
    className="search-icon"
    onClick={ onImgClick }
    data-testid="search-top-btn"
    src={ searchIcon }
    alt="search icon"
    type="image"
  />);

  const searchBox = (
    <form onSubmit={ onBtnClick }>
      <input
        data-testid="search-input"
        type="text"
        value={ name }
        onChange={ onChange }
      />
      <input
        data-testid="exec-search-btn"
        type="submit"
        value="Procurar"
      />
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient-search-radio"
          name="search-options"
          value="ingredient"
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name-search-radio"
          name="search-options"
          value="name"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter-search-radio"
          name="search-options"
          value="firstLetter"
        />
      </label>
    </form>
  );

  return (
    <header>
      {profile && (
        <input
          className="profile-icon"
          src={ profileIcon }
          alt="profile icon"
          type="image"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
          id="profile"
        />
      )}
      <h1
        data-testid="page-title"
      >
        {title}
      </h1>
      <div>
        {searchButton && (searchImg)}
        {inputState && (searchBox)}
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profile: PropTypes.bool.isRequired,
  searchButton: PropTypes.bool.isRequired,
  foods: PropTypes.bool.isRequired,
};