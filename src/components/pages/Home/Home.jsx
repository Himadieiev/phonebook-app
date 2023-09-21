import React from 'react';
import { useSelector } from 'react-redux';
import css from './Home.module.css';
import authSelectors from 'redux/Auth/selectors';
import { useSpring, animated, config } from '@react-spring/web';
import { useNavigate } from 'react-router';

const Home = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const navigate = useNavigate();

  const toLogin = () => {
    navigate('/login');
  };

  const toContacts = () => {
    navigate('/contacts');
  };

  const [{ background }] = useSpring(
    () => ({
      from: { background: 'var(--step0)' },
      to: [
        { background: 'var(--step0)' },
        { background: 'var(--step1)' },
        { background: 'var(--step2)' },
        { background: 'var(--step3)' },
        { background: 'var(--step4)' },
      ],
      config: config.molasses,
      loop: {
        reverse: true,
      },
    }),
    []
  );

  return (
    <>
      <div className={css.container}>
        <div className={css.squares}>
          <div className={css.block} />
          <div className={css.block} />
          <div className={css.textHomeTop}>YOUR</div>
          <div className={css.textHome}>PERSONAL</div>
          <div className={css.textHomeBottom}>PHONEBK</div>
          <animated.div className={css.block} style={{ background }} />
        </div>
        <animated.div className={css.background} style={{ background }} />

        {!isLoggedIn && (
          <div className={css.btn} onClick={toLogin}>
            GET STARTED
          </div>
        )}

        {isLoggedIn && (
          <div className={css.btn} onClick={toContacts}>
            GET STARTED
          </div>
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
      </div>
    </>
  );
};

export default Home;
