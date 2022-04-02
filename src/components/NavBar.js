import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Login from './Login';
import Logout from './Logout';

const LogoutButton = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
<Navbar className="py-4" collapseOnSelect expand="lg" bg="dark" variant="dark">
<Container>
<Navbar.Brand href="/">BUDGE<span className="logospan">TED</span></Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
{
      (isAuthenticated ? 
        <Nav className="">
  <Nav.Link href="/profile">All Transactions</Nav.Link>
  
  <Nav.Link href="/categories">Your Analytics</Nav.Link>
  <Nav.Link href="/add-transaction">Add Transaction</Nav.Link>
</Nav> : <div>''</div>
      )}

  <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
      {!isAuthenticated === true ? <Login/>:<div>Signed in as: {user.name}   <Logout/></div>}
        
      </Navbar.Text>
    </Navbar.Collapse>
</Navbar.Collapse>
</Container>
</Navbar>
</>
  );
};

export default LogoutButton;
