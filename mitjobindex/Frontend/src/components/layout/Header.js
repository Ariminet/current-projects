import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';
export const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>My Web Page</h1>
      </Link>
      <AuthOptions />
    </header>
  );
};
