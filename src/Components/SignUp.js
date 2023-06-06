import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const navigate = useNavigate()

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword === enteredConfirmPassword) {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcIbPGIsiRRG6TKVgArKPKmdMlcbj_NLI";

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            navigate('/login')
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error("Authentication Failed");
            });
          }
        })
        .then((data) => {
          console.log("User has Successfully signed up");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Password doesnt match");
    }
  };
  return (
    <Container className="w-50 shadow-lg " style={{border: '1px solid black', borderRadius: '5px',marginTop: '10%'}}>
        <div className="text-center">
            <h1 style={{fontFamily: 'serif', marginTop: '15px'}}>Sign Up</h1>
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
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            ref={confirmPasswordInputRef}
            required
          />
        </Form.Group>
        </Container>
        <div className="text-center mt-4 mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignUp;
