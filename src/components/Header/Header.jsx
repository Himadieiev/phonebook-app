import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import UserMenu from 'components/UserMenu/UserMenu';
import authSelectors from 'redux/Auth/selectors';

import css from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.navigation}>
          <NavLink to="/" className={css.logo}>
            <span className={css.logoIcon}>📞</span>
            <span className={css.logoText}>PhoneBook</span>
          </NavLink>

          <div className={css.links}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.activeLink : ''}`
              }
            >
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  `${css.link} ${isActive ? css.activeLink : ''}`
                }
              >
                Contacts
              </NavLink>
            )}
          </div>

          <div className={css.auth}>
            {!isLoggedIn && (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `${css.authLink} ${isActive ? css.activeAuthLink : ''}`
                  }
                >
                  <svg
                    className={css.icon}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 21V19C16 16.8 14.2 15 12 15H5C2.8 15 1 16.8 1 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                  {!isMobile && <span>Sign Up</span>}
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${css.authLink} ${isActive ? css.activeAuthLink : ''}`
                  }
                >
                  <svg
                    className={css.icon}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 3H19C20.5304 3 22 4.46957 22 6V18C22 19.5304 20.5304 21 19 21H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 17L15 12L10 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 12H3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {!isMobile && <span>Log In</span>}
                </NavLink>
              </>
            )}
            {isLoggedIn && <UserMenu />}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
