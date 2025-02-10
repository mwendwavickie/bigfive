import React, { useState , useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Badge } from "react-bootstrap";
import { FaPlus, FaMinus, FaShoppingCart,FaTrash } from "react-icons/fa";
import NavigationBar from "./Navbar";

const ProductCard = ({ cart, setCart }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;

    const [quantity, setQuantity] = useState(1);
    const [cartCount, setCartCount] = useState(cart.reduce((total, item) => total + item.quantity, 0));

    useEffect(() => {
        setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    }, [cart]);

    if (!product) {
        return (
            <Container className="mt-5">
                <p>Product not found.</p>
                <Button onClick={() => navigate("/")}>Go Back</Button>
            </Container>
        );
    }

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const addToCart = () => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const removeFromCart = () => {
        setCart(cart.filter((item) => item.id !== product.id));
    };

    return (
        <div>
            <NavigationBar />


        <Container className="mt-5">

            <Button variant="secondary" className="ms-2" onClick={() => navigate("/")}>
                        Back to Home
                    </Button>

            <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>
                        <strong>Price: {product.price}</strong>
                    </Card.Text>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center mb-3">
                        <Button variant="danger" onClick={decreaseQuantity}>
                            <FaMinus />
                        </Button>
                        <span className="mx-3 fs-5">{quantity}</span>
                        <Button variant="success" onClick={increaseQuantity}>
                            <FaPlus />
                        </Button>
                    </div>

                    <Card.Text>
                        <strong>Total Price: {product.price * quantity}</strong>
                    </Card.Text>

                    <Button  onClick={addToCart}>
                        <FaShoppingCart className="me-2" />
                        Add to Cart
                    </Button>

                    <Button  onClick={removeFromCart}>
                    <FaTrash className="me-2" />
                        Remove
                    </Button>
                    
                </Card.Body>
            </Card>
            {/* Cart Indicator */}
            <div className="cart-indicator">
                <Button onClick={() => navigate("/cart")} variant="primary">
                    <FaShoppingCart className="me-2" />
                    View Cart
                </Button>
                {cartCount > 0 && (
                    <Badge bg="danger" className={`cart-badge ${cartCount > 0 ? "animate-badge" : ""}`}>
                        {cartCount}
                    </Badge>
                )}
            </div>


            
        </Container>
    </div>
    );
};

export default ProductCard;
