import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import authSelectors from 'redux/Auth/selectors';
import { currentUserThunk } from 'redux/Auth/thunks';
import LoadingPage from 'pages/LoadingPage/LoadingPage';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Layout from './Layout/Layout';
import ScrollToTop from './ScrollToTop/ScrollToTop';

const Home = lazy(() => import('../pages/Home/Home'));
const Contacts = lazy(() => import('../pages/Contacts/Contacts'));
const SignUp = lazy(() => import('../pages/SignUp/SignUp'));
const LogIn = lazy(() => import('../pages/LogIn/LogIn'));

const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    authSelectors.getFetchingCurrentUser
  );

  useEffect(() => {
    dispatch(currentUserThunk());
  }, [dispatch]);

  if (isFetchingCurrentUser) {
    return <LoadingPage />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/contacts" element={<Contacts />} />
          </Route>
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer
        autoClose={1000}
        position="top-right"
        theme="dark"
        closeOnClick
      />
    </>
  );
};

export default App;
