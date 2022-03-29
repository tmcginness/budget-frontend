import { useState, useEffect } from 'react'
import axios from 'axios'
// import Edit from './components/EditForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Card from 'react-bootstrap/Card';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from './pages/Transactions';
import NewTransaction from './pages/NewTransaction';
import EditTransaction from './pages/EditTransaction';

const App = props => {

  const [transactions, setTransactions] = useState([])

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


  // useEffect(() => {
  //   getCharacters()
  // }, [])

  return (
    <>
      {/* <div className="container">
        <Add handleCreate={handleCreate} />
        <
      </div> */}

      <BrowserRouter>
          <header className='header'>
          
          </header>
          <div className="container1">
            <Routes>

              <Route exact path="/" element={<Transactions />} />
              <Route exact path="/add-transaction" element={<NewTransaction handleCreate={handleCreate}/>} />
              <Route exact path="/edit-transaction/:id" element={<EditTransaction transaction={transactions} handleUpdate={handleUpdate}/>} />
              
            </Routes>
          </div>
        </BrowserRouter>

    </>
  )
}


export default App
