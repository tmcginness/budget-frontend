import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { useAuth0 } from "@auth0/auth0-react";
import {Link } from "react-router-dom";


const NewTransaction = props => {
    const { user, isAuthenticated } = useAuth0();
    let emptyTransaction = { ...props.transaction }
    const [transactions, setTransactions] = useState(emptyTransaction)
    const [modalShow, setModalShow] = useState(false);

    const MyVerticallyCenteredModal = (props) => {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Success!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>You've Added A New Transaction</h4>
              <p>
                Great job! You're one step further towards taking control of your financial well-being. Add another transaction, or head on back to the transaction page.
              </p>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide}>Add Another Transaction</Button>
              <Button > <Link to="/profile" className="white">Back To Transactions</Link>
                </Button>
            </Modal.Footer>
          </Modal>
        );
      }
    

    const handleChange = (e) => {
        setTransactions({ ...transactions, [e.target.name]: e.target.value })
    }
      

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleCreate(transactions);
        setModalShow(true);
    }


    return (
    <>
        <Container>
        <h1 className="title my-4">Add A Transaction</h1>

      <MyVerticallyCenteredModal
        show={modalShow }
        animation={false}
        onHide={() => setModalShow(false)}
      />

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