import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const emailInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        setIsLoading(true);

        const enteredEmail = emailInputRef.current.value;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBcIbPGIsiRRG6TKVgArKPKmdMlcbj_NLI';

        fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: enteredEmail,
            }),
            headers: {
                "Content-type" : "application/json",
            }
        }).then((res) => {
            if(res.ok) {
                setIsLoading(false);
                return res.json()
            }
            else {
                return res.json().then((data) => {
                    throw new Error('Password Reset Failed');
                })
            }
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            alert(err.message)
        })
    }

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
        <h1 style={{ fontFamily: "serif", marginTop: "15px" }}>Reset Password</h1>
      </div>

      <Form onSubmit={submitHandler}>
        <Container>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="enter your registered mail" ref={emailInputRef} required />
          </Form.Group>
          
        </Container>
        <div className="text-center mt-4 mb-3">
            {isLoading && <h5>Loading...</h5>}
        </div>
        
        <div className="text-center mt-4 mb-3">
          <Button variant="success" type="submit">
            Send Link
          </Button>
        </div>
      </Form>
      <div className="text-center mt-1 mb-3">
      <Button variant="outline text-primary" onClick={() => {navigate('/login')}} >Login with existing account</Button>
        </div>
    </Container>
  );
};

export default PasswordReset;
