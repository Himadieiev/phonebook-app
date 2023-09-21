import { NavLink } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import css from './Header.module.css';
import UserMenu from 'components/UserMenu/UserMenu';
import authSelectors from 'redux/Auth/selectors';

const Header = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.navigation}>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/contacts"
              className={`${css.link} ${css.linkContacts}`}
            >
              Contacts
            </NavLink>
          )}
          {!isLoggedIn && (
            <div className={css.rightLinks}>
              <NavLink
                to="/register"
                className={`${css.link} ${css.linkSignUp}`}
              >
                Sign Up
              </NavLink>
              <NavLink to="/login" className={`${css.link} ${css.linkLogin}`}>
                Log In
              </NavLink>
            </div>
          )}
          {isLoggedIn && <UserMenu className={css.user} />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
