import React from "react";
import { Col, Row } from "react-bootstrap";

const ExpensesList = (props) => {
  let head;
  if (props.list.length === 0) {
    head = <h1 className="mt-4">No Expenses</h1>;
  } else {
    head = (
      <div className="mt-3" style={{ width: "80%", marginLeft: "10%", }}>
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

      {props.list.map((expense) => (
        <li key={expense.enteredDescription} className="mt-3">
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
