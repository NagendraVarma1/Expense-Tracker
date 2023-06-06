import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)

    const userLoggedIn = !!token

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token)
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token')
    }

    const authContext = {
        token: token,
        loggedIn: userLoggedIn,
        logIn: loginHandler,
        logOut: logoutHandler
    }
    return(
            <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>

    )
}

export default AuthProvider;