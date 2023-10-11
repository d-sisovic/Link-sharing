import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/login/Login';
import AuthContext from './context/AuthContext';
import { Routes } from './ts/enums/routes.enum';
import Register from './components/register/Register';
import LinkWrapper from './components/link/LinkWrapper';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/private-route/PrivateRoute';
import NotFoundPage from './components/not-found-page/NotFoundPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <PrivateRoute component={<Dashboard />} />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: Routes.LINK,
        element: <LinkWrapper />
      },
    ]
  },
  {
    path: Routes.LOGIN,
    element: <Login />
  },
  {
    path: Routes.REGISTER,
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </React.StrictMode>,
)
