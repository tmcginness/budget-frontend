import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import SlideIn from '../components/SlideIn';
import Chart from '../components/ReChart';
import Pie from '../components/PieChart';
import Bar from '../components/BarGraph';
import Line from '../components/LineGraph';


const Categories = () => {
  const { user, isLoading } = useAuth0();
  const [categories, setCategories] = useState([]);

const getCategories = () => {
    axios.get('https://glacial-journey-00163.herokuapp.com/api/sum/' + user.email)
      .then(
        (response) => setCategories(response.data),
        (error) => console.error(error))
      .catch()
  }


  useEffect(() => {
      if(isLoading===false) {getCategories();}
}, [isLoading]);

  if (isLoading) {
    return <div>Loading ...</div>;
  } 

  return (
    <>
    <SlideIn/>
    <Container className="my-4">
    <h2 className="mb-4 title">Categories</h2>
        <Row>
            {categories.map((category) => {
            return (
                <Col className="mb-3" md="4" sm="12">
      
                <Card >
                <Card.Header><h3 className="center ubunto blue">{category.name}</h3></Card.Header>
                <Card.Body>
                    <Card.Text className="center">
             
                    <h4>Total Spent: ${category.value}</h4>
                    <h5>Category Transactions: {category.count}</h5>
                    </Card.Text>
                </Card.Body>
                </Card>  
            </Col>
             
            )})
            }
        </Row>
        <h2 className="my-3 title">Analytics</h2>
        <Row>
        
            <Col className="mb-3" md="4" sm="12">
            <Card >
                <Card.Header><h3 className="center ubunto blue">Spending By Category</h3></Card.Header>
                <Card.Body>
                    <Chart/>
                </Card.Body>
                </Card>  
                
            </Col>
            <Col className="mb-3" md="4" sm="12">
            <Card >
                <Card.Header><h3 className="center ubunto blue">Spending By Category</h3></Card.Header>
                <Card.Body>
                    <Pie/>
                </Card.Body>
                </Card>  
            </Col>
            <Col className="mb-3" md="4" sm="12">
            <Card >
                <Card.Header><h3 className="center ubunto blue">Spending By Category</h3></Card.Header>
                <Card.Body>
                    <Bar/>
                </Card.Body>
                </Card>  
            </Col>
        </Row>
        <Row>
            <Col className="mb-3" md="12" sm="12">
            <Card >
                <Card.Header><h3 className="center ubunto blue">Spending By Category</h3></Card.Header>
                <Card.Body>
                    <Line/>
                </Card.Body>
                </Card>  
            </Col>

        </Row>

  
    </Container>

    </>
  );
};

export default Categories;