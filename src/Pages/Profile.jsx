import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';

function Profile() {
  const h1Title = 'Profile';
  const history = useHistory();
  const { userEmail } = useContext(RecipesContext);

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
      <h4 data-testid="profile-email">{userEmail.email}</h4>
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
