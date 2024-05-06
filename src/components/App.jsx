import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect, lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { currentUserThunk } from 'redux/Auth/thunks';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Layout from './Layout/Layout';

const Home = lazy(() => import('../pages/Home/Home'));
const Contacts = lazy(() => import('../pages/Contacts/Contacts'));
const SignUp = lazy(() => import('../pages/SignUp/SignUp'));
const LogIn = lazy(() => import('../pages/LogIn/LogIn'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUserThunk());
  }, [dispatch]);

  return (
    <>
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
      <ToastContainer autoClose={1000} position="top-right" theme="colored" closeOnClick />
    </>
  );
};

export default App;
