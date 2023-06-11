import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/auth-slice";

const ExpensesList = (props) => {
  const [allExpenses, setAllExpenses] = useState([]);
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.auth.themeToggle);

  const email = localStorage.getItem("email");
  const updatedEmail = email.replace("@", "").replace(".", "");

  const fetchData = async () => {
    setLoad(false);
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
    if (load) {
      fetchData();
    }
  }, [load]);

  const deleteExpenseHandler = async (id) => {
    try {
      await axios.delete(
        `https://expense-tracker-86fd0-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`
      );
      setLoad(true);
      console.log("Expense Successfully deleted");
    } catch (err) {
      alert(err);
    }
  };

  const downloadExpenses = () => {
    const data = allExpenses.map((expense) => {
      return `Amount: ${expense.enteredAmount}, Description: ${expense.enteredDescription}, Category: ${expense.enteredCategory}`;
    })
    const text = data.join('\n');
    const blob = new Blob([text], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses.txt';
    link.click();

    URL.revokeObjectURL(url);
  }

  let head;
  if (allExpenses.length === 0) {
    head = <h1 className="mt-4">No Expenses</h1>;
  } else {
    head = (
      <div
        className="mt-3"
        style={
          theme
            ? {
                backgroundColor: "black",
                color: "white",
                width: "80%",
                marginLeft: "10%",
              }
            : { width: "80%", marginLeft: "10%" }
        }
      >
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

  let totalAmount = 0;

  return (
    <ul
      className="list-unstyled"
      style={theme ? { backgroundColor: "black", color: "white" } : {}}
    >
      <h1
        style={
          theme
            ? {
                borderBottom: "1px solid white",
                paddingBottom: "5px",
                textAlign: "center",
              }
            : {
                borderBottom: "1px solid black",
                paddingBottom: "5px",
                textAlign: "center",
              }
        }
      >
        Your Expenses
      </h1>
      {props.premiumFeatures && (
        <Button
        onClick={downloadExpenses}
          className="mx-2"
          variant={theme ? "outline text-light" : "outline"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-file-earmark-arrow-down"
            viewBox="0 0 16 16"
          >
            <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
          </svg>
          Download
        </Button>
      )}
      {head}

      {allExpenses.map((expense) => {
        totalAmount = totalAmount + Number(expense.enteredAmount);

        dispatch(authActions.isPremium(totalAmount));
        return (
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
                      onClick={() => {
                        props.onEditClick(expense);
                      }}
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
        );
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginTop: "30px",
          marginRight: "80px",
        }}
      >
        <h2 className="mx-3">Total Amount: </h2>
        <h2>{totalAmount}</h2>
      </div>
    </ul>
  );
};

export default ExpensesList;
