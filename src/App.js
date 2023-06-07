import React, { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogInPage";
import Home from "./Components/Home";
import Profile from "./Components/ProfilePage";
import PasswordReset from "./Components/PasswordReset";
import Expenses from "./Components/Expenses";
import AuthContext from "./Store/Auth/auth-context";

const App = () => {

  const authCtx = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: <SignUp/>},
        {path: '/login', element: <LogIn />},
        {path: '/home', element: authCtx.loggedIn ? <Home /> : <LogIn />},
        {path: '/profile', element: authCtx.loggedIn ? <Profile /> : <LogIn />},
        {path: '/password-reset', element: <PasswordReset />},
        {path: '/expenses', element: authCtx.loggedIn ? <Expenses /> : <LogIn />}
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
