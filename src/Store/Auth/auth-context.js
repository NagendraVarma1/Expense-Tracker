import React from "react";

const AuthContext = React.createContext({
    token: '',
    loggedIn: false,
    logIn: (token) => {},
    logOut: () => {},

})

export default AuthContext;