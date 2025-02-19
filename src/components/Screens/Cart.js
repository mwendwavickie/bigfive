import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../Navbar';
import './CartPage.css'; // Import CSS file for custom styles

const CartPage = ({ cart, setCart }) => {
    const navigate = useNavigate();

    // Remove item from cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    return (
        <div>
            <NavigationBar cart={cart}/>
        
        <Container className="cart-container">
            <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

            {/* If cart is empty, show message */}
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <FaShoppingCart size={50} className="cart-icon" />
                    <p>Your cart is empty!</p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Go Shopping
                    </Button>
                </div>
            ) : (
                <>
                    {/* Display products in the cart */}
                    <Row>
                        {cart.map((product) => (
                            <Col key={product.id} xs={12} md={6} lg={4}>
                                <Card className="cart-item">
                                    <Card.Img variant="top" src={product.image} className="cart-image" />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text className="price">💲{product.price}</Card.Text>
                                        <Button 
                                            variant="danger" 
                                            className="remove-btn"
                                            onClick={() => removeFromCart(product.id)}
                                        >
                                            <FaTrash /> Remove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Checkout Button */}
                    <div className="checkout-container">
                        <Button variant="success" className="checkout-btn" onClick={() => alert("Proceed to Checkout")}>
                            Proceed to Checkout
                        </Button>
                    </div>
                </>
            )}
        </Container>
        </div>
    );
};

export default CartPage;
