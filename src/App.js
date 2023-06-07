import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogInPage";
import Home from "./Components/Home";
import Profile from "./Components/ProfilePage";
import PasswordReset from "./Components/PasswordReset";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: <SignUp/>},
        {path: '/login', element: <LogIn />},
        {path: '/home', element: <Home />},
        {path: '/profile', element: <Profile />},
        {path: '/password-reset', element: <PasswordReset />}
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
