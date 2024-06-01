import React from "react";
import ReactDOM from "react-dom/client";
import App from "@features/layout/App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

// pages
import Home from "@features/home/Home";
import Page from "@features/page/Page";

const queryClient = new QueryClient();

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Axios } from "axios";

// Axios.defaults.baseURL = "http://127.0.0.1:8000/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/page",
        element: <Page />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
