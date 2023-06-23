import React, { useContext, useEffect, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthContext from './context/auth-context';
import RootLayout from './RootLayout';

import Login from './pages/Login';

import Home from './pages/manajemen/Home';
import Manajer from './pages/manajemen/Manajer';
import Penjualan from './pages/manajemen/Penjualan';
import Resepsionis from './pages/manajemen/Resepsionis';
import ErrorPage from './pages/error';

const routerLogin = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
    ]
  }
])
const routerAdmin = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/penjualan', element: <Penjualan /> },
      { path: '/resepsionis', element: <Resepsionis /> },
      { path: '/manajer', element: <Manajer /> },
    ]
  }
])

function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      {!ctx.isLoggedIn && (<RouterProvider router={routerLogin} />)}
      {ctx.isLoggedIn && ctx.role === 'admin' && (
        <RouterProvider router={routerAdmin} />
      )}
    </>
  );
}

export default App;
