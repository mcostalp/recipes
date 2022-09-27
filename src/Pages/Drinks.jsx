import React from 'react';
import Footer from '../Components/Footer';
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
      <Footer />
    </div>
  );
}

export default Drinks;
