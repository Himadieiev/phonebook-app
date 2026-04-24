import { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { registerThunk } from 'redux/Auth/thunks';

import css from './SignUp.module.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        if (errors.name) setErrors({ ...errors, name: '' });
        break;
      case 'email':
        setEmail(value);
        if (errors.email) setErrors({ ...errors, email: '' });
        break;
      case 'password':
        setPassword(value);
        if (errors.password) setErrors({ ...errors, password: '' });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await dispatch(registerThunk({ name, email, password })).unwrap();

      navigate('/');

      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.container}>
      <div className={css.card}>
        <div className={css.iconWrapper}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 21V19C16 16.8 14.2 15 12 15H5C2.8 15 1 16.8 1 19V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="8.5"
              cy="7.5"
              r="4.5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20 8V14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M23 11H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className={css.title}>Create account</h1>
        <p className={css.subtitle}>Get started with PhoneBook</p>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={css.form}
          noValidate
        >
          <TextField
            label="Full Name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            className={css.input}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            className={css.input}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            className={css.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            className={css.button}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>

        <p className={css.footer}>
          Already have an account?{' '}
          <Link to="/login" className={css.link}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
