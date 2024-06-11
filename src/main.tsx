import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./app/store.ts";
import "./styles/main.css";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Blog from "./pages/Blog.tsx";
import CreateBlog from "./pages/CreateBlog.tsx";
import AccountDetails from "./pages/AccountDetails.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import LogOut from "./pages/LogOut.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "/create",
        element: <CreateBlog />,
      },
      {
        path: "/account",
        element: <AccountDetails />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/log-out",
        element: <LogOut />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <RouterProvider router={router} />
    </ReduxStoreProvider>
  </React.StrictMode>
);
