import React, { Fragment } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../Store/auth-slice";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const token = localStorage.getItem('token')

  const logOutClickHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate("/login");
  };

  const emailVerificationHandler = () => {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBcIbPGIsiRRG6TKVgArKPKmdMlcbj_NLI";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error("Email Verification Failed");
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
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
      <div
        style={{ marginTop: "20px", textAlign: "right", paddingRight: "20px" }}
      >
        <Button
          className="mx-3"
          variant="outline-success text-dark"
          onClick={emailVerificationHandler}
        >
          Verify Email Id
        </Button>
        <Button
          variant="outline-success text-dark"
          onClick={logOutClickHandler}
        >
          LogOut
        </Button>
      </div>
      <Container
        className="text-center"
        style={{ marginTop: "20%", borderStyle: 'dashed', padding: '30px'}}
      >
        <h1 className="mb-3">Click below to Track your Dialy Expenses</h1>
        <div>
          <NavLink to={'/expenses'}><h3>Add New Expenses</h3></NavLink>
        </div>
      </Container>
    </Fragment>
  );
};

export default Home;
