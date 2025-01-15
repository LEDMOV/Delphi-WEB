// src/components/layouts/Layout.js
import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
        {children}
      </div>
    </main>
  </>
);

export default Layout;
