import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import NewTransaction from './pages/NewTransaction';
import EditTransaction from './pages/EditTransaction';
import Login from './components/Login';
import Logout from './components/Logout';
import { useAuth0 } from "@auth0/auth0-react";

const App = props => {

  const [transactions, setTransactions] = useState([])
  const { user, isAuthenticated, isLoading } = useAuth0();

  // const getCharacters = () => {
  //   axios.get('http://localhost:8000/api/characters')
  //     .then(
  //       (response) => setCharacters(response.data),
  //       (error) => console.error(error))
  //     .catch()

  // }

  const handleCreate = (addTransaction) => {
    axios.post('https://glacial-journey-00163.herokuapp.com/api/transactions', addTransaction)
      .then((response) => {
        console.log(response);
        setTransactions([...transactions, response.data])
      })
  }

  const handleUpdate = (editTransactions) => {
    axios.put('https://glacial-journey-00163.herokuapp.com/api/transactions/' + editTransactions.id, editTransactions)
      .then((response) => {
        setTransactions(transactions.map((transaction) => {
          return transactions.id !== editTransactions.id ? transactions : editTransactions
        }))
      })
  }


  return (
    <>
      {/* <div className="container">
        <Add handleCreate={handleCreate} />
        <
      </div> */}
      {!isAuthenticated === true ? <Login />:<Logout />}
      
      
      <BrowserRouter>
          <header className='header'>
          
          </header>
          <div className="container1">
            <Routes>

              <Route exact path="/" element={<Transactions />} />
              <Route path="/profile" element={<Profile />} />
              <Route exact path="/add-transaction" element={<NewTransaction handleCreate={handleCreate}/>} />
              <Route exact path="/edit-transaction/:id" element={<EditTransaction transaction={transactions} handleUpdate={handleUpdate}/>} />
              
            </Routes>
          </div>
        </BrowserRouter>

    </>
  )
}


export default App
