import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import authSelectors from 'redux/Auth/selectors';

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}
