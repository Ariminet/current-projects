import React, { useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';
export const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const history = useHistory();

  const { setUserData } = useContext(UserContext);

  const login = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };

      await Axios.post('/api/users/register', newUser);
      const loginRes = await Axios.post('/api/users/login', {
        email,
        password,
      });
      setUserData({ token: loginRes.data.token, user: loginRes.data.user });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={submit} className="form">
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify Password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <label htmlFor="register-displayname">Display name</label>
        <input
          type="text"
          id="register-displayname"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type="submit" value="Register" />
        <button onClick={login}>Log in</button>
      </form>
    </div>
  );
};
