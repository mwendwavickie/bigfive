import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Carousel, Button, Row, Col, Card, Badge } from 'react-bootstrap';
import NavigationBar from "./Navbar";
import Footer from "./Footer";
import "./HomePage.css";
import ProductListing from "./ProductListing";
import Testimonials from "./Testimonials";
import ProductCard from "./ProductCard";


const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [offers, setOffers] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
          try {
            const response = await axios.get('http://localhost:5000/products');
            setFeaturedProducts(response.data.slice(0, 4));
          } catch (error) {
            console.error('Error fetching featured products:', error.message);
          }
        };
    
        const fetchOffers = async () => {
          try {
            const response = await axios.get('http://localhost:5000/products');
            setOffers(response.data.slice(0, 4));
          } catch (error) {
            console.error('Error fetching current deals:', error.message);
          }
        };
    
        fetchFeaturedProducts();
        fetchOffers();
    }, []);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(product => product.id !== productId));
    };

    return (
        <div>
            <NavigationBar cartCount={cart.length} />
            {/* Featured Products Carousel */}
            <Container className="mt-4">
                {featuredProducts.length > 0 ? (
                    <Carousel>
                        {featuredProducts.map((product) => (
                            <Carousel.Item key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                                <img
                                    className="d-block w-100 carousel-image"
                                    src={product.image}
                                    alt={product.name}
                                />
                                <Carousel.Caption>
                                    <h3>{product.name}</h3>
                                    <p><strong>{product.price}</strong></p>
                                    <Button className="detailsbtn" onClick={() => navigate(`/products/${product.id}`)}>View Details</Button>
                                    <Button className="cartbtn" onClick={() => addToCart(product)}>Add to Cart</Button>
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
                                <Card className="offer-card">
                                    <Card.Img variant="top" src={offer.image} onClick={() => navigate(`/products/${offer.id}`)} />
                                    <Card.Body>
                                        <Card.Title>{offer.name}</Card.Title>
                                        <Card.Text>{offer.price}</Card.Text>
                                        <Button variant="success" onClick={() => addToCart(offer)}>Add to Cart</Button>
                                        
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
