import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { LoginPage } from "./routes/LoginPage";
import { RootPage } from "./routes/RootPage";
import { LoginRedirectPage } from './routes/LoginRedirectPage';
import { RoutesEnum } from './types';
import { ZtyrPage } from './routes/ZtyrPage';

const router = createBrowserRouter([
  {
    path: RoutesEnum.ROOT,
    element: <RootPage/>,
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
        element: <ZtyrPage/>
      }
    ]
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}/>
);
