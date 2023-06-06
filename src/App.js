import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import Login from "./Components/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: <Login />}
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
