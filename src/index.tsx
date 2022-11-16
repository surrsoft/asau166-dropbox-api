import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { LoginPage } from "./routes/LoginPage";
import { RootPage } from "./routes/RootPage";
import { LoginRedirectPage } from './routes/LoginRedirectPage';
import { RoutesEnum } from './types';
import { ZtyrPage } from './routes/ZtyrPage';
import { ErrorPage } from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: RoutesEnum.ROOT,
    element: <RootPage/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: RoutesEnum.LOGIN,
        element: <LoginPage/>,
      },
      {
        path: RoutesEnum.LOGIN_REDIRECT,
        element: <LoginRedirectPage/>,
      },
      {
        path: RoutesEnum.ZTYR,
        element: <ZtyrPage/>,
        errorElement: <ErrorPage/>,
      }
    ]
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}/>
);
