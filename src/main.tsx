import './index.scss';
import App from './App';
import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import Login from './components/login/Login';
import Preview from './components/preview/Preview';
import Profile from './components/profile/Profile';
import Register from './components/register/Register';
import LinkWrapper from './components/link/LinkWrapper';
import { RoutePaths } from './ts/enums/rout-paths.enum';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/private-route/PrivateRoute';
import NotFoundPage from './components/not-found-page/NotFoundPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: RoutePaths.HOME,
        element: <PrivateRoute component={<Dashboard />} />,
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
        path: RoutePaths.PREVIEW + '/:id',
        element: <Preview />
      },
      {
        path: RoutePaths.LOGIN,
        element: <Login />
      },
      {
        path: RoutePaths.REGISTER,
        element: <Register />
      }
    ],
    errorElement: <NotFoundPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
