import { useDispatch, useSelector } from 'react-redux';
import css from './UserMenu.module.css';
import { Button } from '@mui/material';
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
      <Button
        type="button"
        variant="contained"
        color="primary"
        className={css.button}
        onClick={() => dispatch(logoutThunk())}
      >
        Log Out
      </Button>
    </div>
  );
};

export default UserMenu;
