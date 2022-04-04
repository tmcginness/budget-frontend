import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from '../images/budgetedlogoonly.png'
import { Link } from 'react-router-dom';


const SlideIn = () => {
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
<Navbar expand={false}>
  <Container fluid>
    <Navbar.Brand href="#"></Navbar.Brand>
    <Navbar.Toggle aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="start"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel"><h3>Your Info</h3></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      {
      (isAuthenticated ? 
      <div className="offcanvasinner">
        <img className="roundImage" width="150px" height="150px"src={user.picture} alt={user.name} />
        <h2 className="center">{user.name}</h2>
        <p className="center">{user.email}</p>
      </div> : <h1>Sign In Please</h1>
      )}
                <Card className="grey flex">
                <Card.Img
                className=" slideInImage"
                variant="top" src={Image} />
                <Card.Body>
                <Card.Text className="text-muted">
                    Personalized Resources Just For You! 
                </Card.Text>
                <Card.Text className="center text-muted">
                <a href="https://www.nerdwallet.com/" target="_blank" rel="noreferrer"> Nerd Wallet</a> 
                </Card.Text>
                <Card.Text className="center text-muted">
                <a href="https://mint.intuit.com/" target="_blank" rel="noreferrer">Mint</a> 
                </Card.Text>
                <Card.Text className="center text-muted">
                <a href="https://www.creditkarma.com/" target="_blank" rel="noreferrer"> Credit Karma</a> 
                </Card.Text>
                <Card.Text className="center text-muted">
                <a href="https://www.dupagecu.com/" target="_blank" rel="noreferrer">DuPage Credit Union</a> 
                </Card.Text>
                <Card.Text className="center text-muted">
                <a href="https://www.moneygeek.com/credit-cards/" target="_blank" rel="noreferrer">MoneyGeek</a> 
                </Card.Text>
                <Card.Text className="center text-muted">
                <a href="https://www.lendingtree.com/credit-cards/" target="_blank" rel="noreferrer">Lending Tree</a> 
                </Card.Text>
                <Card.Text className="center text-muted">
                <a href="https://app.anchorprotocol.com/earn" target="_blank" rel="noreferrer">Anchor Earn</a> 
                </Card.Text>
                <Card.Text className="center text-muted">
                <a href="https://www.experian.com/" target="_blank" rel="noreferrer" >Experian</a> 
                </Card.Text>
                </Card.Body>
            </Card>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
</>
  );
};

export default SlideIn;
