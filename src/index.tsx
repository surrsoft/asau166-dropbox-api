import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./routes/LoginPage";
import { RootPage } from "./routes/RootPage";
import { LoginRedirectPage } from './routes/LoginRedirectPage';
import { RoutesEnum } from './types';
import { ZtyrPage } from './routes/ZtyrPage';
import { ErrorPage } from './routes/ErrorPage';
import { AuthorizeAirtablePage } from './routes/AuthorizeAirtablePage';
import { RedirectAirtablePage } from './routes/RedirectAirtablePage';

const routes = [
  {
    path: RoutesEnum.ROOT,
    element: <RootPage/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: RoutesEnum.AUTH_DROPBOX,
        element: <LoginPage/>,
        errorElement: <ErrorPage/>,
      },
      {
        path: RoutesEnum.LOGIN_REDIRECT,
        element: <LoginRedirectPage/>,
        errorElement: <ErrorPage/>,
      },
      {
        path: RoutesEnum.REDIRECT_AIRTABLE,
        element: <RedirectAirtablePage/>,
        errorElement: <ErrorPage/>,
      },
      {
        path: RoutesEnum.ZTYR_APP,
        element: <ZtyrPage/>,
        errorElement: <ErrorPage/>,
      },
      {
        path: RoutesEnum.AUTH_AIRTABLE,
        element: <AuthorizeAirtablePage/>,
        errorElement: <ErrorPage/>,
      }
    ]
  },
];

const createRouter = process.env.NODE_ENV === 'production' ? createHashRouter : createBrowserRouter;

const router = createRouter(routes);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}/>
);
