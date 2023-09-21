import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import { currentUserThunk } from 'redux/Auth/thunks';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import Layout from './Layout/Layout';
import authSelectors from 'redux/Auth/selectors';

const Home = lazy(() => import('./pages/Home/Home'));
const Contacts = lazy(() => import('./pages/Contacts/Contacts'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const LogIn = lazy(() => import('./pages/LogIn/LogIn'));

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    authSelectors.getFetchingCurrentUser
  );

  useEffect(() => {
    dispatch(currentUserThunk());
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <Contacts />
                </PrivateRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <LogIn />
                </PublicRoute>
              }
            />
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer
          autoClose={2500}
          position="top-center"
          theme="colored"
          closeOnClick
        />
      </>
    )
  );
}
