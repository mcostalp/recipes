import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import RecipesContext from '../context/RecipesContext';
import '../Styles/Footer.css';

function Footer() {
  const history = useHistory();

  const {
    setPageState,
  } = useContext(RecipesContext);

  const handleButtonClick = ({ target }) => {
    setPageState(target.id);
    history.push(`/${target.name}`);
  };

  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <input
        className="drinks-icon"
        src={ drinkIcon }
        alt="drinks icon"
        type="image"
        name="drinks"
        data-testid="drinks-bottom-btn"
        onClick={ handleButtonClick }
        id="drinks-all"
      />
      <input
        className="meals-icon"
        src={ mealIcon }
        alt="meals icon"
        type="image"
        name="meals"
        data-testid="meals-bottom-btn"
        onClick={ handleButtonClick }
        id="meals-all"
      />
    </footer>
  );
}

export default Footer;
