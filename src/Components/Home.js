import React, { Fragment, useContext } from "react";
import { Button, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../Store/Auth/auth-context";

const Home = () => {

  const authCtx = useContext(AuthContext)

  const emailVerificationHandler = () => {

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBcIbPGIsiRRG6TKVgArKPKmdMlcbj_NLI'
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: authCtx.token,
      }),
      headers : {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      else {
        return res.json().then((data) => {
          throw new Error('Email Verification Failed');
        })
      }
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      alert(err.message)
    })
  }
  return (
    <Fragment>
      <Navbar
        style={{ border: "1px solid black", justifyContent: "space-between" }}
      >
        <h5 style={{ marginLeft: "2px" }}>Welcome to Expense Tracker</h5>

        <p
          style={{
            backgroundColor: "rgb(232, 232, 232)",
            padding: "1px 10px",
            borderRadius: "5px",
            margin: "2px",
          }}
        >
          Your Profile is incomplete.
          <NavLink to={"/profile"}>Complete Now</NavLink>
        </p>
      </Navbar>
      <Button
        variant="outline-success text-dark"
        style={{ position: "absolute", right: "20px", top: "60px" }}
        onClick={emailVerificationHandler}
      >
        Verify Email Id
      </Button>
    </Fragment>
  );
};

export default Home;
