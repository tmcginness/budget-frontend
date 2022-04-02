import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useAuth0 } from "@auth0/auth0-react";



const NewTransaction = props => {
    const { user, isAuthenticated } = useAuth0();
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
        <Container>
        <h1 className="title my-4">Add A Transaction</h1>
        <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">

                    <Form.Label className="ubunto blue" htmlFor='vendor'>Vendor:</Form.Label>
                    <Form.Control required type='text' name='vendor' onChange={handleChange} value={transactions.vendor} />
                    <br />
                    <Form.Label className="ubunto blue" htmlFor='date'>Date:</Form.Label>
                    <Form.Control required type='date' name='date' onChange={handleChange} value={transactions.date} />
                    <br />
                    <Form.Label className="ubunto blue" htmlFor='description'>Description:</Form.Label>
                    <Form.Control required type='description' name='description' onChange={handleChange} value={transactions.description} />
                    <br />
                    <Form.Label className="ubunto blue" htmlFor='price'>Price:</Form.Label>
                    <Form.Control required type='number' name='price' onChange={handleChange} value={transactions.price} />
                    <br />
                    <Form.Label className="ubunto blue" htmlFor='category'>Category:</Form.Label>
                    <Form.Control required type='text' name='category' onChange={handleChange} value={transactions.category} />
                    <br />
                    <Form.Label className="ubunto blue" htmlFor='notes'>Notes:</Form.Label>
                    <Form.Control required type='text' name='notes' onChange={handleChange} value={transactions.notes} />
                    <br />
                    <Form.Label className="ubunto blue" htmlFor='owner'>Owner:</Form.Label>
                    <Form.Control required placeholder={!isAuthenticated === true ? '': user.email} type='text' name='owner' onChange={handleChange} value={transactions.owner} />
                    <br />
                    <div className="flex"><Button type='submit'>Add Transaction</Button></div>
                    
                </Form.Group>
            </Form>
        </Container>
        </>
    )
}

export default NewTransaction;