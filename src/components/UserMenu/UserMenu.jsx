import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

import css from './UserMenu.module.css';
// import authSelectors from 'redux/Auth/selectors';
import { logoutThunk } from 'redux/Auth/thunks';

const UserMenu = () => {
  const dispatch = useDispatch();
  // const user = useSelector(authSelectors.getUsername);

  return (
    <div className={css.user}>
      <p className={css.welcome}>
        Welcome, <span className={css.name}>{/* {user.name} */}Guest</span>
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
