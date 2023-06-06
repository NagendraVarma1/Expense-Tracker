import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogInPage";
import Home from "./Components/Home";
import Profile from "./Components/ProfilePage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: <SignUp/>},
        {path: '/login', element: <LogIn />},
        {path: '/home', element: <Home />},
        {path: '/profile', element: <Profile />}
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
