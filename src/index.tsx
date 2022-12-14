import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./routes/LoginPage";
import { RootPage } from "./modules/root/routes/RootPage";
import { LoginRedirectPage } from './routes/LoginRedirectPage';
import { RoutesEnum } from './types';
import { ZtyrPage } from './modules/ztyr/routes/ZtyrPage';
import { ErrorPage } from './modules/root/routes/ErrorPage';
import { AuthorizeAirtablePage } from './modules/airtable/routes/AuthorizeAirtablePage';
import { RedirectAirtablePage } from './modules/airtable/routes/RedirectAirtablePage';
import { AuthorizeGoogleApis } from './modules/googleApiAuth/routes/AuthorizeGoogleApis';
import { RedirectGooglePage } from './modules/googleApiAuth/routes/RedirectGooglePage';
import { GoogleSheetsResearchPage } from './modules/googleSheetsResearch/routes/GoogleSheetsResearchPage';
import { AppShopListPage } from './modules/appShopList/routes/AppShopListPage';

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
        path: RoutesEnum.AUTH_GOOGLE_APIS,
        element: <AuthorizeGoogleApis/>,
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
        path: RoutesEnum.REDIRECT_GOOGLE,
        element: <RedirectGooglePage/>,
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
      },
      {
        path: RoutesEnum.GOOGLE_SHEETS_RESEARCH,
        element: <GoogleSheetsResearchPage/>,
        errorElement: <ErrorPage/>,
      },
      {
        path: RoutesEnum.APP_SHOPPING_LIST,
        element: <AppShopListPage/>,
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
