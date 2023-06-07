import React, { useContext, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AuthContext from "../Store/Auth/auth-context";
import { NavLink, useNavigate } from "react-router-dom";

const LogIn = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcIbPGIsiRRG6TKVgArKPKmdMlcbj_NLI";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application-json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error("Authentication Failed!!");
          });
        }
      })
      .then((data) => {
        navigate("/home");
        authCtx.logIn(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Container
      className="w-50 shadow-lg "
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        marginTop: "10%",
      }}
    >
      <div className="text-center">
        <h1 style={{ fontFamily: "serif", marginTop: "15px" }}>Log In</h1>
      </div>

      <Form onSubmit={submitHandler}>
        <Container>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailInputRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordInputRef} required />
          </Form.Group>
        </Container>
        <div className="text-center mt-1">
          <NavLink to={'/password-reset'}>forgot password?</NavLink>
        </div>
        <div className="text-center mt-4 mb-3">
          <Button variant="success" type="submit">Log In</Button>
        </div>
      </Form>
      <div className="text-center mt-1 mb-3">
        <Button
          variant="outline text-primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Create New account
        </Button>
      </div>
    </Container>
  );
};

export default LogIn;
