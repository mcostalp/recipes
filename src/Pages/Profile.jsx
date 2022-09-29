import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Profile() {
  const h1Title = 'Profile';
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user')).email;

  function logout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header
        h1Title={ h1Title }
        profile
      />
      <h4 data-testid="profile-email">{userEmail}</h4>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
