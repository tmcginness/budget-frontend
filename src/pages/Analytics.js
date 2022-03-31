import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Edit from './EditTransaction';
import SlideIn from '../components/SlideIn';

const Categories = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
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


  useEffect(() => {
    const getCategories = () => {
        axios.get('https://glacial-journey-00163.herokuapp.com/api/sum/' + user.email)
          .then(
            (response) => setCategories(response.data),
            (error) => console.error(error))
          .catch()
      }
      if(isLoading===false) {getCategories();}
}, [isLoading]);

  if (isLoading) {
    return <div>Loading ...</div>;
  } 

  return (
    <>
    <Container>
            {categories.map((category) => {
            return (

            <Card>
                <Card.Header>{category.category}</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    <h2>${category.total_transactions}</h2>
                    <h3>Total Transactions:{category.count}</h3>
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>   
            )})
            }
</Container>
    </>
  );
};

export default Categories;