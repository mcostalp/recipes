import React from 'react';
import { useParams } from 'react-router-dom';

function DrinksDetails() {
  const { id } = useParams();
  const title = 'DrinksDetails';
  console.log(id);
  return (
    <div>
      <h1>{title}</h1>
      <p>{id}</p>
    </div>
  );
}

export default DrinksDetails;
