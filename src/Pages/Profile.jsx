import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const title = 'Profile';
  return (
    <div>
      <Header
        title={ title }
        profile
      />
      <Footer />
    </div>
  );
}

export default Profile;