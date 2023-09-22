import React from 'react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Header from 'components/Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loadind...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
