import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function DoneMealCard({ item, index }) {
  const history = useHistory();
  const [copiedLink, setCopiedLink] = useState(false);

  const clipCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${item.id}`);
    setCopiedLink(true);
  };

  const onClick = () => {
    history.push(`/meals/${item.id}`);
  };

  return (
    <div>
      <Link to={ `/drinks/${item.id}` }>
        <img
          src={ item.image }
          alt={ item.name }
          className="recipeIMG"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <h4
        className="recipeName"
        data-testid={ `${index}-horizontal-name` }
        onClick={ onClick }
        onKeyDown={ onClick }
        role="presentation"
      >
        { item.name }
      </h4>
      <h5
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${item.category} - ${item.alcoholicOrNot}` }
      </h5>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {item.doneDate }
      </p>
      <ul>
        {item.tags !== '' ? item.tags.slice(0, 2).map((tag, ind) => (
          <li key={ ind } data-testid={ `${index}-${tag}-horizontal-tag` }>
            { tag }
          </li>
        )) : ''}
      </ul>
      <input
        type="image"
        alt="shareIcon"
        className="shareIcon"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ clipCopy }
      />
      { copiedLink && <p>Link copied!</p> }
    </div>
  );
}

DoneMealCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape().isRequired,
};
