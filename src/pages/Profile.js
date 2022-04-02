import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Edit from './EditTransaction';
import SlideIn from '../components/SlideIn';

const Profile = () => {
  const { user, isLoading } = useAuth0();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);

  const getTransactions = () => {
    axios.get('https://glacial-journey-00163.herokuapp.com/api/owner/' + user.email)
      .then(
        (response) => setTransactions(response.data),
        (error) => console.error(error))
      .catch()
  }

  const getCategories = () => {
    axios.get('https://glacial-journey-00163.herokuapp.com/api/sum/' + user.email)
      .then(
        (response) => setCategories(response.data),
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

  useEffect(() => {
      if(isLoading===false){ {getTransactions();} {getCategories();} }
}, [isLoading]);

  

  if (isLoading) {
    return <div>Loading ...</div>;
  } 


  return (
      <>
      <SlideIn/>
      <Container>

          <h2 className="title">All Transactions</h2>
          <div id="transaction">

          { checked ? 
            <Button className="m-2" onClick={toggleChecked}>Exit Edit Mode</Button>
       : <Button className="m-2" onClick={toggleChecked}>Enter Edit Mode</Button>
      }
          
          <Table bordered>
      <thead>
      <tr>
        <th>Date</th>
        <th>Vendor</th>
        <th>Total</th>
        <th>Description</th>
        <th>Category</th>
        <th colSpan={2}>Delete</th>
      </tr>
    </thead>
    
  {transactions.map((singleTransaction) => {
    return (
      <tbody key={singleTransaction.id}>
      <tr>
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