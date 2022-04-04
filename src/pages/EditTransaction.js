import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const Edit = (props) => {
    let emptyTransaction = { ...props.transaction };
    const [transaction, setTransaction] = useState(emptyTransaction);

    const handleChange = (event) => {
        setTransaction({ ...transaction, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(transaction)
    }

    return (
        <>
            <details>
                <summary>Edit Transaction</summary>
                
                <Form onSubmit={handleSubmit}>
                
                <Form.Group className="left mb-3">
                
                    <Form.Label htmlFor='vendor'>Vendor:</Form.Label>
                    <Form.Control type='text' name='vendor' onChange={handleChange} value={transaction.vendor} />
                    <br />
                    <Form.Label htmlFor='date'>Date:</Form.Label>
                    <Form.Control type='date' name='date' onChange={handleChange} value={transaction.date} />
                    <br />
                    <Form.Label htmlFor='description'>Description:</Form.Label>
                    <Form.Control type='description' name='description' onChange={handleChange} value={transaction.description} />
                    <br />
                    <Form.Label htmlFor='price'>Price:</Form.Label>
                    <Form.Control step="any" type='number' name='price' onChange={handleChange} value={transaction.price} />
                    <br />
                    <Form.Label htmlFor='category'>Category:</Form.Label>
                    <Form.Control type='text' name='category' onChange={handleChange} value={transaction.category} />
                    <br />
                    <Form.Label htmlFor='notes'>Notes:</Form.Label>
                    <Form.Control type='text' name='notes' onChange={handleChange} value={transaction.notes} />
                    <br />

                    <Button className="blueBackground" type='submit'>Edit Transaction</Button>
                    </Form.Group>
                    
                </Form>
                </details>
        </>
    )
}

export default Edit