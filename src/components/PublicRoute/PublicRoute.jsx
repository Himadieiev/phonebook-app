import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import authSelectors from 'redux/Auth/selectors';

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const { state } = useLocation();

  return !isLoggedIn ? children : <Navigate to={state ? state : '/'} />;
};

export default PublicRoute;
