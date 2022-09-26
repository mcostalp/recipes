import React from 'react';
import Header from '../Components/Header';

function Meals() {
  const title = 'Meals';
  return (
    <div>
      <Header
        searchButton
        title={ title }
        profile
      />
    </div>
  );
}

export default Meals;
