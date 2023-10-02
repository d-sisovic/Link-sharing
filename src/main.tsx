import './index.scss';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/login/Login';
import { Routes } from './ts/enums/routes.enum';
import Register from './components/register/Register';
import NotFoundPage from './components/not-found-page/NotFoundPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <App />,
    errorElement: <NotFoundPage />
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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
