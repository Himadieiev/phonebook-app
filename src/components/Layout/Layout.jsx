import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import LoadingPage from 'pages/LoadingPage/LoadingPage';

import css from './Layout.module.css';

const Layout = () => {
  return (
    <div className={css.layout}>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <main className={css.main}>
          <Outlet />
        </main>
      </Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
