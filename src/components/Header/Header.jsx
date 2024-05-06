import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserMenu from 'components/UserMenu/UserMenu';
import authSelectors from 'redux/Auth/selectors';

import css from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const location = useLocation();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.navigation}>
          <NavLink
            to="/"
            className={location.pathname === '/' ? `${css.link} ${css.activeLink}` : css.link}
          >
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/contacts"
              className={
                location.pathname === '/contacts'
                  ? `${css.link} ${css.linkContacts} ${css.activeLink}`
                  : `${css.link} ${css.linkContacts}`
              }
            >
              Contacts
            </NavLink>
          )}
          {!isLoggedIn && (
            <div className={css.rightLinks}>
              <NavLink to="/register" className={`${css.link} ${css.linkSignUp}`}>
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
