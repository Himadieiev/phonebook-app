import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import authSelectors from 'redux/Auth/selectors';

import css from './Home.module.css';

const Home = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <main className={css.container}>
      <h1 className={css.title}>
        {isLoggedIn ? 'Welcome to your personal Phonebook!' : 'This is your personal Phonebook'}
      </h1>

      {!isLoggedIn && (
        <p className={css.infoText}>
          Thank you for choosing our service. Please note that during the initial authorization
          process, there might be a slight delay as our free server occasionally takes a bit longer
          to process requests. We appreciate your patience and understanding.
        </p>
      )}

      <p className={css.infoText}>
        {isLoggedIn
          ? "Click 'GET STARTED' button below to begin accessing your contacts. Thank you!"
          : "Click 'GET STARTED' button below to proceed to the Login or Registration page. Thank you!"}
      </p>

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
    </main>
  );
};

export default Home;
