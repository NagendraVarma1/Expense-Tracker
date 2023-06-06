import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import SignUp from "./Components/SignUp";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: <SignUp/>}
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
