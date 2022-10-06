import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';
import '../Styles/Profile.css';

function Profile() {
  const h1Title = 'Profile';
  const history = useHistory();
  const { userEmail } = useContext(RecipesContext);

  function logout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <>
      <Header
        h1Title={ h1Title }
        profile
      />
      <div className="profile-main-content">
        <h4 data-testid="profile-email">{userEmail.email}</h4>
        <button
          className="btn"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          className="btn"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          className="btn"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout
        </button>

      </div>
      <Footer />
    </>
  );
}

export default Profile;
