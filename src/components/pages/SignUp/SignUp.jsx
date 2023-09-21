import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerThunk } from 'redux/Auth/thunks';
import css from './SignUp.module.css';

export default function SignUp() {
  const dispatch = useDispatch();
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

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerThunk({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={css.container}>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={css.button}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
