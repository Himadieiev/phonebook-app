import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import css from './SignUp.module.css';
import { registerThunk } from 'redux/Auth/thunks';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    dispatch(registerThunk({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');

    try {
      await dispatch(registerThunk({ name, email, password }));

      navigate('/');

      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <main className={css.container}>
      <h1 className={css.title}>Sign Up</h1>
      <form onSubmit={handleSubmit} autoComplete="off" className={css.form}>
        <TextField
          id="outlined-name-input"
          label="Name"
          type="text"
          name="name"
          value={name}
          autoComplete="current-name"
          onChange={handleChange}
          className={css.input}
        />
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
          Sign Up
        </Button>
      </form>
    </main>
  );
}
