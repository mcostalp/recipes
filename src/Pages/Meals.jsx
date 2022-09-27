import React from 'react';
import Footer from '../Components/Footer';
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
      <Footer />
    </div>
  );
}

export default Meals;
