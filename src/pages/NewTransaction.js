import { useState, useEffect } from 'react'
import axios from 'axios'
// import Add from './components/AddForm'
// import Edit from './components/EditForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';



const NewTransaction = props => {
    let emptyTransaction = { ...props.transaction }
    const [transactions, setTransactions] = useState(emptyTransaction)

    const handleChange = (e) => {
        setTransactions({ ...transactions, [e.target.name]: e.target.value })
    }
      

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleCreate(transactions)
    }


    return (
    <>
        <Link to={'/'} className="btn"> <h2>Back</h2></Link>
        <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">

                    <Form.Label htmlFor='vendor'>Vendor:</Form.Label>
                    <Form.Control type='text' name='vendor' onChange={handleChange} value={transactions.vendor} />
                    <br />
                    <Form.Label htmlFor='date'>Date:</Form.Label>
                    <Form.Control type='date' name='date' onChange={handleChange} value={transactions.date} />
                    <br />
                    <Form.Label htmlFor='description'>Description:</Form.Label>
                    <Form.Control type='description' name='description' onChange={handleChange} value={transactions.description} />
                    <br />
                    <Form.Label htmlFor='price'>Price:</Form.Label>
                    <Form.Control type='number' name='price' onChange={handleChange} value={transactions.price} />
                    <br />
                    <Form.Label htmlFor='category'>Category:</Form.Label>
                    <Form.Control type='text' name='category' onChange={handleChange} value={transactions.category} />
                    <br />
                    <Form.Label htmlFor='notes'>Notes:</Form.Label>
                    <Form.Control type='text' name='notes' onChange={handleChange} value={transactions.notes} />
                    <br />
                    <Form.Label htmlFor='owner'>Owner:</Form.Label>
                    <Form.Control type='text' name='owner' onChange={handleChange} value={transactions.owner} />
                    <br />
                    


                    <Button type='submit'>Add Transaction</Button>
                </Form.Group>
            </Form>

        </>
    )
}

export default NewTransaction;