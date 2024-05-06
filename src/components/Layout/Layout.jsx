import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Loader from 'components/Loader/Loader';

import css from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className={css.loadingWrapper}>
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
