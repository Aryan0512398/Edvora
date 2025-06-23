import React from 'react';

const WelcomeBanner = () => {
  return (
    <div className='p-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-pink-500 rounded-2xl'>
      <h2 className='font-bold text-xl text-white'>Welcome to Edvora</h2>
      <p className='text-white'>Learn, Create and Explore your favourite courses</p>
      <p className='text-sm text-white mt-2 italic'>Empowering Minds, Enabling Futures.</p>
    </div>
  );
};

export default WelcomeBanner;
