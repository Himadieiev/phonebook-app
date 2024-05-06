import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loadind...</p>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
