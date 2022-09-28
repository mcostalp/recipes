import React from 'react';
import { useParams } from 'react-router-dom';

function MealsDetails() {
  const { id } = useParams();
  const title = 'MealsDetails';
  console.log(id);
  return (
    <div>
      <h1>{title}</h1>
      <p>{id}</p>
    </div>
  );
}

export default MealsDetails;
