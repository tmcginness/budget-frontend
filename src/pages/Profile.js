import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Edit from './EditTransaction';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [transactions, setTransactions] = useState([]);
  const { email, setEmail } = useState();
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);



  const getTransactions = () => {
    axios.get('https://glacial-journey-00163.herokuapp.com/api/owner/' + user.email)
      .then(
        (response) => setTransactions(response.data),
        (error) => console.error(error))
      .catch()
  }

  const handleUpdate = (editTransaction) => {
    axios.put('https://glacial-journey-00163.herokuapp.com/api/transactions/' + editTransaction.id, editTransaction)
      .then((response) => {
        setTransactions(transactions.map((transaction) => {
          return transaction.id !== editTransaction.id ? transaction : editTransaction
        }))
      })
  }

    const handleDelete = (e) => {
    axios.delete('https://glacial-journey-00163.herokuapp.com/api/transactions/' + e.target.value)
      .then((response) => {
        getTransactions()
      })
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  } 

  setTimeout(() => getTransactions(), 500);

  return (
      <>
      <Container>
      {
      (isAuthenticated ? 
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div> : <h1>Sign In Please</h1>
      )}
          <h2>Transactions
          
          </h2>
          <Link className="m-2" to={'/add-transaction'}><Button>Add Transaction</Button></Link>
          <div id="transaction">

          { checked ? 
            <Button className="m-2" onClick={toggleChecked}>Exit Edit Mode</Button>
       : <Button className="m-2" onClick={toggleChecked}>Enter Edit Mode</Button>
      }
          
          <Table striped bordered hover>
      <thead>
      <tr>
        <th>Date</th>
        <th>Vendor</th>
        <th>Total</th>
        <th>Description</th>
        <th>Category</th>
        <th colSpan={2}>Edit/Delete</th>
      </tr>
    </thead>
    
  {transactions.reverse().map((singleTransaction) => {
    return (
      <tbody>
      <tr key={singleTransaction.id}>
        <td className="date">{singleTransaction.date}</td>
        <td>{singleTransaction.vendor}</td>
        <td>${singleTransaction.price}</td>
        <td>{singleTransaction.description}</td>
        <td>{singleTransaction.category}</td>
        <td><button onClick={handleDelete} value={singleTransaction.id}>Delete</button></td>
      </tr>
      { checked ? 
      <tr>
        <td className="center" colSpan={7}><Edit handleUpdate={handleUpdate} transaction={singleTransaction} /></td>
      </tr> : null
      }
      </tbody>
    )
  })}
  
  </Table>
  </div>
    
  </Container>
</>
  );
};

export default Profile;