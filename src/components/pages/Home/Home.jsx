import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import css from './Home.module.css';
import authSelectors from 'redux/Auth/selectors';

const Home = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <main className={css.container}>
      <p className={css.textHome}>This is your personal Phonebook</p>
      {!isLoggedIn && (
        <Link className={css.btn} to={'/login'}>
          GET STARTED
        </Link>
      )}

      {isLoggedIn && (
        <Link className={css.btn} to={'/contacts'}>
          GET STARTED
        </Link>
      )}

      <div className={css.bottomText}>
        <span>Developed by </span>
        <a
          href="https://github.com/Himadieiev"
          target="_blank"
          rel="noreferrer"
          className={css.bottomLink}
        >
          Himadieiev Ruslan
        </a>
      </div>
    </main>
  );
};

export default Home;
