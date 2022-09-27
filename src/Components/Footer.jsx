import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer
      id="footer"
      data-testid="footer"
    >
      <input
        className="drinks-icon"
        src={ drinkIcon }
        alt="drinks icon"
        type="image"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        id="drinks-icon"
      />
      <input
        className="meals-icon"
        src={ mealIcon }
        alt="meals icon"
        type="image"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
        id="meals-icon"
      />
    </footer>
  );
}

export default Footer;
