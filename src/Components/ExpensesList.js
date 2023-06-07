import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const ExpensesList = () => {
  const [allExpenses, setAllExpenses] = useState([]);
  const fetchData = async () => {
    try {
      const email = localStorage.getItem("email");
      const updatedEmail = email.replace("@", "").replace(".", "");

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
    fetchData();
  }, []);
  let head;
  if (allExpenses.length === 0) {
    head = <h1 className="mt-4">No Expenses</h1>;
  } else {
    head = (
      <div className="mt-3" style={{ width: "80%", marginLeft: "10%" }}>
        <Row>
          <Col>
            <h3>Amount</h3>
          </Col>
          <Col>
            <h3>Description</h3>
          </Col>
          <Col>
            <h3>Category</h3>
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
              <Col>
                <h4>{expense.enteredAmount}</h4>
              </Col>
              <Col>
                <h4>{expense.enteredDescription}</h4>
              </Col>
              <Col>
                <h4>{expense.enteredCategory}</h4>
              </Col>
            </Row>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
