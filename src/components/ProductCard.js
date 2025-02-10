import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const ProductCard = ({ products, cart, setCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <p>Product not found.</p>;
    }

    const addToCart = () => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = () => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct && existingProduct.quantity > 1) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item));
        } else {
            setCart(cart.filter(item => item.id !== product.id));
        }
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>Price: ${product.price * quantity}</strong></Card.Text>
                    <Card.Text><strong>Quantity: {quantity}</strong></Card.Text>
                    <Button variant="success" onClick={addToCart}>Add to Cart</Button>
                    <Button variant="danger" onClick={removeFromCart} className="ms-2">Remove</Button>
                    <Button as={Link} to="/" variant="secondary" className="ms-2">Back to Home</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductCard;
