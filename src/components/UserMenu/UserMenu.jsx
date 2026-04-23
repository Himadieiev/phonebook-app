import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import authSelectors from 'redux/Auth/selectors';
import { logoutThunk } from 'redux/Auth/thunks';

import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  const initials = name.slice(0, 2).toUpperCase();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={css.user}>
      <div
        className={css.avatarWrapper}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        <span className={css.initials}>{initials}</span>
        {showPopup && (
          <div className={css.popup}>
            <span className={css.popupName}>{name}</span>
          </div>
        )}
      </div>
      <button
        type="button"
        className={css.logoutButton}
        onClick={() => dispatch(logoutThunk())}
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
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 17L21 12L16 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {!isMobile && <span className={css.logoutText}>Log Out</span>}
      </button>
    </div>
  );
};

export default UserMenu;
