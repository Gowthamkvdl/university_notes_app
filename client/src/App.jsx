import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Ensure you import from 'react-router-dom'
import Layout from "./components/layout/Layout";
import Home from "./routes/home/Home";
import NewPost from "./routes/newPost/NewPost";
import { postsLoader } from "./lib/loader";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: postsLoader,
        },
        {
          path: "/upload",
          element: <NewPost />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
