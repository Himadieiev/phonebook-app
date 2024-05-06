import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import LoadingPage from 'pages/LoadingPage/LoadingPage';

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
