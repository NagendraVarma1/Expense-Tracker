import React, { Fragment, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ExpensesList from "./ExpensesList";
import axios from "axios";

const Expenses = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const email = localStorage.getItem("email");
  const updatedEmail = email.replace("@", "").replace(".", "");

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
      await axios.post(
        `https://expense-tracker-86fd0-default-rtdb.firebaseio.com/${updatedEmail}.json`,
        enteredExpenses
      );

      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Fragment>
      <Container>
        <div className="text-center">
          <h1>Add New Expense</h1>
        </div>
        <Form
          className="mt-3 shadow-lg"
          onSubmit={formSubmitHandler}
          style={{
            width: "60%",
            marginLeft: "20%",
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
        <ExpensesList />
      </Container>
    </Fragment>
  );
};

export default Expenses;
