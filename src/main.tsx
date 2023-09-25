import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/Home";

import "@/index.css";
import { Question } from "@/pages/Question";
import { DataStoreProvider } from "@/context/DataStore";
import { PATH } from "@/utils/const";
import { Result } from "@/pages/Result";

const router = createBrowserRouter([
  { path: PATH.HOME, element: <Home /> },
  { path: `/${PATH.QUESTION}/:questionId`, element: <Question /> },
  { path: PATH.RESULT, element: <Result /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataStoreProvider>
      <RouterProvider router={router} />
    </DataStoreProvider>
  </React.StrictMode>
);
