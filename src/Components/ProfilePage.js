import React, { useEffect, useRef } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const nameInputRef = useRef();
    const imageInputRef = useRef();

    const fetchData = () => {
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBcIbPGIsiRRG6TKVgArKPKmdMlcbj_NLI';

      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        else {
          return res.json().then((data) => {
            throw new Error('Fetching Data Failed')
          })
        }
      }).then((data) => {
        data.users.forEach((user) => {
          nameInputRef.current.value = user.displayName;
          imageInputRef.current.value = user.photoUrl;
        })
        
      }).catch((err) => {
        alert(err.message)
      })
    }

    useEffect(() => {
      fetchData()
    }, [])

    const profileSubmitHandler = (event) => {
        event.preventDefault();

        const updatedName = nameInputRef.current.value;
        const updatedImage = imageInputRef.current.value;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBcIbPGIsiRRG6TKVgArKPKmdMlcbj_NLI';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
                displayName: updatedName,
                photoUrl: updatedImage,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) =>{
            if(res.ok) {
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    throw new Error('Update Failed!!')
                })
            }
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            alert(err.message)
        })
    }
    const cancleHandler = () => {
      navigate('/home')
    }

  return (
    <>
      <Navbar style={{ border: "1px solid black" }}>
        <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
          Update your profile here
        </p>
      </Navbar>
      <Form onSubmit={profileSubmitHandler}>
        <Container className="shadow-lg" style={{ border: "1px solid black", marginTop: '10%',borderRadius: '8px', width: '60%' }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: '10px' , borderBottom: '1px solid black' }}>
            <h3>Contact Details</h3>
            <Button variant="outline-danger" onClick={cancleHandler}>Cancle</Button>
          </div>
          <Form.Group className="mt-3">
            <Form.Label>Full Name: </Form.Label>
            <Form.Control type="text" ref={nameInputRef}/>
          </Form.Group>
          <Form.Group className="mt-3 mb-4">
            <Form.Label>Profile Photo URL: </Form.Label>
            <Form.Control type="url" ref={imageInputRef}/>
          </Form.Group>
          <div className="text-center mb-3">
            <Button variant="success" type="submit">Update</Button>
        </div>
        </Container>
        
      </Form>
    </>
  );
};

export default Profile;
