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
  const [query, setQuery] = useState("")

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

          <h2 className="mb-4 title">All Transactions</h2>
          <div className="flex searchBar">
                <input style={{width:400}} placeholder="Search By Vendor, Description, Or Category" onChange={event => setQuery(event.target.value)} />
            
          

          { checked ? 
            <Button className="blueBackground my-4" onClick={toggleChecked}>Exit Edit Mode</Button>
       : <Button className="blueBackground my-4" onClick={toggleChecked}>Enter Edit Mode</Button>
      }
      </div>
      <div id="transaction">
          <Table variant="light" bordered>
      <thead>
      <tr>
        <th>Date</th>
        <th>Vendor</th>
        <th>Total</th>
        <th>Description</th>
        <th>Category</th>
        <th className="center" colSpan={2}>Delete</th>
      </tr>
    </thead>
    
    {
        transactions.filter(transactions => {
            if (query === '') {
                return transactions;
            } else if ((transactions.vendor.toLowerCase().includes(query.toLowerCase())) || (transactions.description.toLowerCase().includes(query.toLowerCase())) || (transactions.category.toLowerCase().includes(query.toLowerCase()))) {
                return transactions;
            }
                }).map((singleTransaction) => {
    return (
      <tbody key={singleTransaction.id}>
      <tr>
        <td className="date">{singleTransaction.date}</td>
        <td>{singleTransaction.vendor}</td>
        <td>${singleTransaction.price}</td>
        <td>{singleTransaction.description}</td>
        <td>{singleTransaction.category}</td>
        <td className="flex"><Button  onClick={handleDelete} value={singleTransaction.id}>Delete</Button></td>
      </tr>
      { checked ? 
      <tr>
      <td colSpan={1}></td>
        <td className="center" colSpan={4}><Edit handleUpdate={handleUpdate} transaction={singleTransaction} /></td>
        <td colSpan={2}></td>
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