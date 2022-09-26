import React from 'react';
import Header from '../Components/Header';

function Drinks() {
  const title = 'Drinks';
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

export default Drinks;
