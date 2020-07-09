import React from 'react';
import App from 'next/app';
import UserContext from '../context/UserContext';

export default function App() {
  const { Component, pageProps } = props;
  return (
    <UserContext.Provider value={('userData', setUserData)}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
