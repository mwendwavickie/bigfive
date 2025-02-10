import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, ListGroup, Badge } from "react-bootstrap";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

const CartPage = ({ cart, setCart }) => {
    const navigate = useNavigate();

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart(cart.filter((product) => product.id !== productId));
    };

    // Calculate total price
    const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">
                <FaShoppingCart /> Shopping Cart
            </h2>

            {cart.length === 0 ? (
                <div className="text-center">
                    <h4>Your cart is empty!</h4>
                    <Button variant="primary" onClick={() => navigate("/products")}>
                        Browse Products
                    </Button>
                </div>
            ) : (
                <ListGroup>
                    {cart.map((product) => (
                        <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                            <div>
                                <img src={product.image} alt={product.name} style={{ width: "50px", marginRight: "10px" }} />
                                {product.name} - ${product.price}
                            </div>
                            <Button variant="danger" size="sm" onClick={() => removeFromCart(product.id)}>
                                <FaTrash /> Remove
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            {cart.length > 0 && (
                <div className="mt-3">
                    <h4>Total Price: <Badge bg="success">${totalPrice.toFixed(2)}</Badge></h4>
                </div>
            )}
        </div>
    );
};

export default CartPage;
