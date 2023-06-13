import React, { useRef, useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import ExpensesList from "./ExpensesList";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/auth-slice";

const Expenses = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [premiumOpts, setPremiumOpts] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const premium = useSelector((state) => state.auth.isPremium);
  const theme = useSelector((state) => state.auth.themeToggle);

  const email = localStorage.getItem("email");
  const updatedEmail = email.replace("@", "").replace(".", "");

  const editHandler = (expense) => {
    setEdit(true);
    setId(expense.id);
    amountInputRef.current.value = expense.enteredAmount;
    descriptionInputRef.current.value = expense.enteredDescription;
    categoryInputRef.current.value = expense.enteredCategory;
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const enteredAmount = amountInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
      const enteredCategory = categoryInputRef.current.value;

      const enteredExpenses = {
        enteredAmount,
        enteredDescription,
        enteredCategory,
      };
      if (edit) {
        await axios.put(
          `https://expense-tracker-86fd0-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`,
          enteredExpenses
        );
        setEdit(false);
        setId(null);
      } else {
        await axios.post(
          `https://expense-tracker-86fd0-default-rtdb.firebaseio.com/${updatedEmail}.json`,
          enteredExpenses
        );
      }

      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const logOutClickHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const premiumHandler = () => {
    setPremiumOpts(true)
  }

  const themeHandler = () => {
    dispatch(authActions.themeToggle());
  }

  return (
    <div style={theme ? {backgroundColor: 'black'} : {}}>
      <Navbar
        style={theme ? { backgroundColor: 'black',color: 'white',border: "1px solid white", justifyContent: "space-between" } : { border: "1px solid black", justifyContent: "space-between" }}
      >
        <h5 style={{marginLeft: "2px" }}>Welcome to Expense Tracker</h5>

        <p
          style={theme ? { backgroundColor: "rgb(232, 232, 232)",
          padding: "1px 10px",
          borderRadius: "5px",
          margin: "2px",
        color: 'black' } : {
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
        {premiumOpts && (
          <Form
            className="mb-2"
            style={{ display: "flex", justifyContent: "right" }}
          >
            <Form.Check type="switch" onClick={themeHandler} />
          </Form>
        )}
        <Button
          className="mx-3"
          variant={premium ? "success" : "secondary disabled"}
          style={theme ? {backgroundColor: 'black', color: 'white'} : {}}
          onClick={premiumHandler}
        >
          Get Premium
        </Button>
        <Button
          variant={theme ? "outline-success text-light" : "success"}
          onClick={logOutClickHandler}
        >
          LogOut
        </Button>
      </div>
      <Container fluid className="mt-3 pb-3" style={theme ? {backgroundColor: 'black', color: 'white',width: '60%'} : {width: '60%'}}>
        <div className="text-center">
          <h1>Add New Expense</h1>
        </div>
        <Form
          className="mt-3 shadow-lg"
          onSubmit={formSubmitHandler}
          style={theme ? {
            padding: "20px",
            border: '1px solid white',
          } : {
            border: "1px solid black",
            padding: "20px",
          }}
        >
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" ref={amountInputRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={descriptionInputRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select ref={categoryInputRef}>
              <option hidden>Select category</option>
              <option>Food</option>
              <option>Petrol</option>
              <option>Movie</option>
              <option>Others</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center mt-4">
            <Button type="submit">Add Expense</Button>
          </div>
        </Form>
      </Container>
      <Container className="mt-5">
        <ExpensesList onEditClick={editHandler}  premiumFeatures={premiumOpts}/>
      </Container>
    </div>
  );
};

export default Expenses;
