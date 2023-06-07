import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogInPage";
import Home from "./Components/Home";
import Profile from "./Components/ProfilePage";
import PasswordReset from "./Components/PasswordReset";
import Expenses from "./Components/Expenses";

const App = () => {

  const token = localStorage.getItem('token')

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: <SignUp/>},
        {path: '/login', element: <LogIn />},
        {path: '/home', element: token ? <Home /> : <LogIn />},
        {path: '/profile', element: token ? <Profile /> : <LogIn />},
        {path: '/password-reset', element: <PasswordReset />},
        {path: '/expenses', element: token ? <Expenses /> : <LogIn />}
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
