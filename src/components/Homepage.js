import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Carousel, Button, Row, Col, Card } from 'react-bootstrap';
import NavigationBar from "./Navbar";
import Footer from "./Footer";
import "./HomePage.css";
import ProductListing from "./ProductListing";
import Testimonials from "./Testimonials";

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [offers, setOffers] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setFeaturedProducts(response.data.slice(0, 4));
                setOffers(response.data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        if (!cart.some(item => item.id === product.id)) {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    
    // Navigate to ProductCard.js when a product is clicked
    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product } });
    };

    return (
        <div>
            <NavigationBar cart={cart} />
            
            {/* Featured Products Carousel */}
            <Container className="mt-4">
                {featuredProducts.length > 0 ? (
                    <Carousel>
                        {featuredProducts.map((product) => (
                            <Carousel.Item key={product.id} onClick={() => handleProductClick(product)}>
                                <img
                                    className="d-block w-100 carousel-image"
                                    src={product.image}
                                    alt={product.name}
                                />
                                <Carousel.Caption>
                                    <h3>{product.name}</h3>
                                    <p><strong>{product.price}</strong></p>
                                    <Button className="detailsbtn" onClick={() => handleProductClick(product)}>View Details</Button>
                                    <Button
                                        className={`cartbtn ${cart.some(item => item.id === product.id) ? "disabled" : ""}`}
                                        onClick={() => addToCart(product)}
                                        disabled={cart.some(item => item.id === product.id)}
                                    >
                                        {cart.some(item => item.id === product.id) ? "Added to Cart" : "Add to Cart"}
                                    </Button>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <p className="text-center text-muted">No featured products available.</p>
                )}
            </Container>

            {/* Current Offers / Deals */}
            <Container className="mt-5">
                <h2 className="section-title">🔥 Current Offers & Deals 🔥</h2>
                <Row>
                    {offers.length > 0 ? (
                        offers.map((offer) => (
                            <Col md={3} key={offer.id}>
                                <Card className="offer-card" onClick={() => handleProductClick(offer)}>
                                    <Card.Img variant="top" src={offer.image} />
                                    <Card.Body>
                                        <Card.Title>{offer.name}</Card.Title>
                                        <Card.Text>{offer.price}</Card.Text>
                                        <Button
                                            variant="success"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(offer);
                                            }}
                                            disabled={cart.some(item => item.id === offer.id)}
                                        >
                                            {cart.some(item => item.id === offer.id) ? "Added to Cart" : "Add to Cart"}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="text-center text-muted w-100">No offers available at the moment.</p>
                    )}
                </Row>
            </Container>

            <hr />
            <ProductListing />
            <hr />
            <Testimonials />
            <hr />
            <Footer />
        </div>
    );
};

export default HomePage;
