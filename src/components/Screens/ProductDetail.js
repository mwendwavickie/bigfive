import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FaShoppingCart, FaArrowLeft, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import "./ProductDetail.css";

const ProductDetail = ({ cart, setCart }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product || {};
    const [quantity, setQuantity] = useState(1);
    const [similarProducts, setSimilarProducts] = useState([]);

    // Fetch similar products
    useEffect(() => {
        const fetchSimilarProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setSimilarProducts(response.data.filter(p => p.id !== product.id)); // Exclude current product
            } catch (error) {
                console.error('Error fetching similar products:', error);
            }
        };
        if (product.category) fetchSimilarProducts();
    }, [product.category, product.id]);

    // Increase quantity
    const increaseQuantity = () => setQuantity(quantity + 1);

    // Decrease quantity
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // Add to Cart
    const addToCart = () => {
        const newItem = { ...product, quantity };
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex >= 0) {
            // If product is already in the cart, update quantity
            const updatedCart = [...cart];
            updatedCart[existingIndex].quantity += quantity;
            setCart(updatedCart);
        } else {
            setCart([...cart, newItem]);
        }
    };

    // Render star ratings
    const renderRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-warning" />);
            } else if (i - 0.5 === rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-muted" />);
            }
        }
        return stars;
    };

    return (
        <Container className="mt-4">
            {/* Back to Shopping Button */}
            <Button variant="outline" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back to Shoppping
            </Button>

            <Row className="mt-3">
                {/* Product Image */}
                <Col md={5}>
                    <Card>
                        <Card.Img variant="side" src={product.image} />
                    </Card>
                </Col>

                {/* Product Details */}
                <Col md={7}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>
                                <strong>Price:</strong> {product.price}
                            </Card.Text>

                            {/* Product Rating */}
                            <div className="mb-3">{renderRating(product.rating)}</div>

                            {/* Quantity Counter */}
                            <div className="d-flex align-items-center mb-3">
                                <Button variant="outline-secondary" onClick={decreaseQuantity}>-</Button>
                                <span className="mx-3">{quantity}</span>
                                <Button variant="outline-secondary" onClick={increaseQuantity}>+</Button>
                            </div>

                            {/* Total Price */}
                            <Card.Text>
                                <strong>Total:</strong> {(product.price * quantity)}
                            </Card.Text>

                            {/* Add to Cart & Checkout Buttons */}
                            <Button variant="success" className="me-2" onClick={addToCart}>
                                <FaShoppingCart /> Add to Cart
                            </Button>
                            <Button variant="danger">
                                Checkout
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Similar Products Section */}
            {similarProducts.length > 0 && (
                <>
                    <h3 className="mt-5">Similar Products</h3>
                    <Row>
                        {similarProducts.slice(0, 4).map((item) => (
                            <Col key={item.id} md={3}>
                                <Card className="mb-3 product-card" onClick={() => navigate(`/products/${product.id}`, { state: { product: item } })}>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>{product.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
};

export default ProductDetail;
