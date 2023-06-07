import React, { Fragment, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ExpensesList from "./ExpensesList";

const Expenses = () => {

    const [allExpenses, setAllExpenses] = useState([])

    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;

        const enteredExpenses = {
            enteredAmount,
            enteredDescription,
            enteredCategory
        }

        setAllExpenses((prevState) => {
            return [...prevState, enteredExpenses]
        })

    }
    return (
        <Fragment>
        <Container>
            <div className="text-center">
                <h1>Add New Expense</h1>
            </div>
            <Form className="mt-3 shadow-lg" onSubmit={formSubmitHandler} style={{width: '60%', marginLeft: '20%',border: '1px solid black', padding: '20px'}}>
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" ref={amountInputRef} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" ref={descriptionInputRef} required/>
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
            <ExpensesList list={allExpenses}/>
        </Container>
        </Fragment>
    )
}

export default Expenses;