import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import css from './UserMenu.module.css';
import authSelectors from 'redux/Auth/selectors';
import { logoutThunk } from 'redux/Auth/thunks';

const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);

  return (
    <div className={css.user}>
      <p className={css.welcome}>
        Welcome, <span className={css.name}>{name}</span>
      </p>
      <button type="button" className={css.button} onClick={() => dispatch(logoutThunk())}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
