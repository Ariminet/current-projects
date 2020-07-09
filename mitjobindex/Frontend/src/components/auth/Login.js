import React, { useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const history = useHistory();

  const { setUserData } = useContext(UserContext);
  const register = (e) => {
    e.preventDefault();
    history.push('/register');
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };

      const loginRes = await Axios.post('/api/users/login', loginUser);
      setUserData({ token: loginRes.data.token, user: loginRes.data.user });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h2>Login</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}

      <form onSubmit={submit} className="form">
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
        <button onClick={register}>Register</button>
      </form>
    </div>
  );
};
