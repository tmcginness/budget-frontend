import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewTransaction } from './NewTransaction.js';
import {Link } from 'react-router-dom';
import Edit from './EditTransaction';




const Transactions = props => {

  const [transactions, setTransactions] = useState([])
  const [editTable, showEditTable] = useState('')
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);

  const getTransactions = () => {
    axios.get('https://glacial-journey-00163.herokuapp.com/api/transactions')
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

    useEffect(() => {
    getTransactions()
  }, [])
    return (
    <>
    <h2>Transactions
          
        </h2>
        <h5><Link to={'add-transaction'} className="btn"> Add Transaction</Link></h5>
        <div id="transaction">
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
      <td><button onClick={toggleChecked}>Edit</button></td>
      {/* <Link to={`edit-transaction/${singleTransaction.id}`} className="btn"><button>Edit</button></Link> */}
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
        </>
    )
}

export default Transactions

