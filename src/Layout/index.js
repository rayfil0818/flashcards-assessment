import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

// Layout component to wrap the content with the header and other common elements.
function Layout() {
  console.log('Layout component rendered');
  return (
    <div>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;