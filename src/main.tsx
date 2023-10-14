import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/login/Login';
import AuthContext from './context/AuthContext';
import Preview from './components/preview/Preview';
import Profile from './components/profile/Profile';
import Register from './components/register/Register';
import LinkWrapper from './components/link/LinkWrapper';
import { RoutePaths } from './ts/enums/rout-paths.enum';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/private-route/PrivateRoute';
import NotFoundPage from './components/not-found-page/NotFoundPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: RoutePaths.HOME,
    element: <AuthContext><PrivateRoute component={<Dashboard />} /></AuthContext>,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: RoutePaths.LINK,
        element: <LinkWrapper />
      },
      {
        path: RoutePaths.PROFILE,
        element: <Profile />
      }
    ]
  },
  {
    path: RoutePaths.PREVIEW,
    element: <AuthContext><Preview /></AuthContext>
  },
  {
    path: RoutePaths.LOGIN,
    element: <Login />
  },
  {
    path: RoutePaths.REGISTER,
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
