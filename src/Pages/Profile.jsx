import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const h1Title = 'Profile';
  return (
    <div>
      <Header
        h1Title={ h1Title }
        profile
      />
      <Footer />
    </div>
  );
}

export default Profile;
