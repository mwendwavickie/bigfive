import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';


 
const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='navbar'>
            <Navbar.Brand as={Link} to="/" className='brand-logo'>
            BIG FIVE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/products" className='nav-item'>
                    Products
                    </Nav.Link>

                    <Nav.Link as={Link} to="/cart" className='nav-item'>
                    Cart<span className='cart-count'>(0)</span>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default NavigationBar;