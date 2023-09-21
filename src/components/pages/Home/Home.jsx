import React from 'react';
import { useSelector } from 'react-redux';
import css from './Home.module.css';
import authSelectors from 'redux/Auth/selectors';

const Home = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <div className={css.home}>
      <p className={css.textOne}>
        This is your personal phone book of contacts
      </p>
      {!isLoggedIn && (
        <p className={css.textTwo}>
          To start using it, please Sign Up or Log In
        </p>
      )}
    </div>
  );
};

export default Home;
