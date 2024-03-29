import React, { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
export const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (!userData.user) {
      history.push('/login');
    }
  });
  return <div>Home</div>;
};
