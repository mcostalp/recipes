import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer';

function MealsDetails() {
  const { idMeal } = useParams();
  const title = 'MealsDetails';
  return (
    <div>
      <h1>{title}</h1>
      <p>{idMeal}</p>
      <Footer />
    </div>
  );
}

export default MealsDetails;
