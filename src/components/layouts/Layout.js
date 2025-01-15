// src/components/layouts/Layout.js
import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="p-4">{children}</main>
  </>
);

export default Layout;
