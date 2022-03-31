import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import NewTransaction from './pages/NewTransaction';
import EditTransaction from './pages/EditTransaction';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

const App = props => {

  const [transactions, setTransactions] = useState([])

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
      <Navbar/>
      <BrowserRouter>
          <div className="container1">
            <Routes>

              <Route exact path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route exact path="/add-transaction" element={<NewTransaction handleCreate={handleCreate}/>} />
              <Route exact path="/edit-transaction/:id" element={<EditTransaction transaction={transactions} handleUpdate={handleUpdate}/>} />
              
            </Routes>
          </div>
        </BrowserRouter>
        <Footer fixed="bottom" />
    </>
  )
}


export default App
