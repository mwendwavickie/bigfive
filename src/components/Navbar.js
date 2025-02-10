import React from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart, FaBoxOpen } from 'react-icons/fa';

const NavigationBar = ({ cart}) => { // Ensure cart has a default value
    
    return (
        <Navbar expand="lg" className="navbar" fixed='Top'>
            <Navbar.Brand as={Link} to="/" className="brand-logo">
                BIG FIVE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/ProductListing" className="nav-item">
                        <FaBoxOpen className="nav-icon" /> Products
                    </Nav.Link>

                    <Nav.Link as={Link} to="/cart">
                        <FaShoppingCart size={20} />
                        Cart
                        {cart.length > 0 && <Badge bg="danger" className="ms-1">{cart.length}</Badge>}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
