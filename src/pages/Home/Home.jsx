import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import authSelectors from 'redux/Auth/selectors';

import css from './Home.module.css';

const Home = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <div className={css.hero}>
      <div className={css.container}>
        <img
          src={`${process.env.PUBLIC_URL}/hero.png`}
          alt="Hero"
          width={400}
          height={218}
        />
        <div className={css.badge}>
          <span className={css.badgeText}>
            <span className={css.badgeIcon}>📞</span> Contact Manager
          </span>
        </div>

        <h1 className={css.title}>
          {isLoggedIn ? (
            <>
              Welcome back to your
              <span className={css.gradient}> Phonebook</span>
            </>
          ) : (
            <>
              Your personal
              <span className={css.gradient}> Phonebook</span>
            </>
          )}
        </h1>

        <p className={css.description}>
          {isLoggedIn
            ? 'Access and manage your contacts anytime, anywhere'
            : 'Store, organize, and access your contacts securely in one place'}
        </p>

        <div className={css.cta}>
          {!isLoggedIn && (
            <div className={css.note}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V12L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span>First request may take a few seconds</span>
            </div>
          )}

          <Link to={isLoggedIn ? '/contacts' : '/login'} className={css.button}>
            <span>Get Started</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 5L19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>

        {isLoggedIn && (
          <p className={css.hint}>You have all your contacts ready</p>
        )}
      </div>
    </div>
  );
};

export default Home;
