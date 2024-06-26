import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginThunk } from 'redux/Auth/thunks';

import css from './LogIn.module.css';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await dispatch(loginThunk({ email, password }));

      setTimeout(() => {
        navigate('/');
      }, 1000);

      setEmail('');
      setPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <main className={css.container}>
      <h1 className={css.title}>Sign In</h1>
      <form onSubmit={handleSubmit} autoComplete="off" className={css.form}>
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          value={email}
          autoComplete="current-email"
          onChange={handleChange}
          className={css.input}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          value={password}
          autoComplete="current-password"
          onChange={handleChange}
          className={css.input}
        />
        <Button type="submit" variant="contained" color="primary" className={css.button}>
          Log In
        </Button>
      </form>
    </main>
  );
};

export default LogIn;
