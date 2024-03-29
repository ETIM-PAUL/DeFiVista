// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/contact";
import CompanyPage from "./pages/CompanyPage";
import MyCompanyPage from "./pages/MyCompanyPage";
import AdminPage from "./pages/AdminPage";
import CreateCompanyPage from "./pages/CreateCompanyPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import UserDetailPage from "./pages/UserDetailPage";
const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/companies",
    element: <CompanyPage />,
  },

  {
    path: "/my-company",
    element: <MyCompanyPage />,
  },

  {
    path: "/admin",
    element: <AdminPage />,
  },

  {
    path: "/create-company",
    element: <CreateCompanyPage />,
  },

  {
    path: "/company-details/:id",
    element: <CompanyDetailsPage />,
  },

  {
    path: "/user-details",
    element: <UserDetailPage />,
  },

  {
    path: "/contact",
    element: <Contact />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
