import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, profile, searchButton }) {
  const history = useHistory();
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
      {searchButton && (
        <div>
          <input
            className="search-icon"
            onClick={ () => setInputState((prev) => !prev) }
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
            type="image"
          />
        </div>)}
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profile: PropTypes.bool.isRequired,
  searchButton: PropTypes.bool.isRequired,
};
