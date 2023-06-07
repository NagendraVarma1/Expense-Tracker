import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const ExpensesList = (props) => {
  const [allExpenses, setAllExpenses] = useState([]);
  const [load, setLoad] = useState(true)

  const email = localStorage.getItem("email");
  const updatedEmail = email.replace("@", "").replace(".", "");

  const fetchData = async () => {
    setLoad(false)
    try {
      const response = await axios.get(
        `https://expense-tracker-86fd0-default-rtdb.firebaseio.com/${updatedEmail}.json`
      );

      const data = await response.data;
      if (data) {
        const expenses = Object.keys(data).map((key) => ({
          id: key,
          enteredAmount: data[key].enteredAmount,
          enteredCategory: data[key].enteredCategory,
          enteredDescription: data[key].enteredDescription,
        }));
        setAllExpenses(expenses);
      } else {
        setAllExpenses([]);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if(load){
      fetchData();
    }
  }, [load]);

  const deleteExpenseHandler = async (id) => {
    try {
      await axios.delete(
        `https://expense-tracker-86fd0-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`
      );
      setLoad(true)
      console.log("Expense Successfully deleted");
    } catch (err) {
      alert(err);
    }
  };

  let head;
  if (allExpenses.length === 0) {
    head = <h1 className="mt-4">No Expenses</h1>;
  } else {
    head = (
      <div className="mt-3" style={{ width: "80%", marginLeft: "10%" }}>
        <Row>
          <Col xs={3}>
            <h5>Amount</h5>
          </Col>
          <Col xs={3}>
            <h5>Description</h5>
          </Col>
          <Col xs={3}>
            <h5>Category</h5>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <ul className="list-unstyled">
      <h1
        style={{
          borderBottom: "1px solid black",
          paddingBottom: "5px",
          textAlign: "center",
        }}
      >
        Your Expenses
      </h1>
      {head}

      {allExpenses.map((expense) => (

        <li key={expense.id} className="mt-3">
          <div style={{ width: "80%", marginLeft: "10%" }}>
            <Row>
              <Col xs={3}>
                <h4>{expense.enteredAmount}</h4>
              </Col>
              <Col xs={3}>
                <h4>{expense.enteredDescription}</h4>
              </Col>
              <Col xs={3}>
                <h4>{expense.enteredCategory}</h4>
              </Col>
              <Col xs={3}>
                <div style={{ display: "flex" }}>
                  <Button
                    style={{ marginRight: "4px" }}
                    variant="secondary text-light"
                    onClick={() => {props.onEditClick(expense)}}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ marginRight: "4px" }}
                    variant="danger text-light"
                    onClick={() => deleteExpenseHandler(expense.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
