import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginThunk } from 'redux/Auth/thunks';

import css from './LogIn.module.css';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

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
      await dispatch(loginThunk({ email, password })).unwrap();

      setTimeout(() => {
        navigate('/');
      }, 1000);

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
              d="M15 3H19C20.5304 3 22 4.46957 22 6V18C22 19.5304 20.5304 21 19 21H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10 17L15 12L10 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 12H3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className={css.title}>Welcome back</h1>
        <p className={css.subtitle}>Sign in to your account</p>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={css.form}
          noValidate
        >
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
              'Sign In'
            )}
          </Button>
        </form>

        <p className={css.footer}>
          Don't have an account?{' '}
          <Link to="/register" className={css.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
