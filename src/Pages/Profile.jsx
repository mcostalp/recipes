import React from 'react';
import Header from '../Components/Header';

function Profile() {
  const title = 'Profile';
  return (
    <div>
      <Header
        searchButton={ false }
        title={ title }
        profile
      />
    </div>
  );
}

export default Profile;
