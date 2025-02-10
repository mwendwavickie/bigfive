import React from "react";
import NavigationBar from "./Navbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Carousel, Button, Row, Col, Card } from 'react-bootstrap';
import  ProductListing from "./ProductListing";

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
          try {
            const response = await axios.get('http://localhost:5000/products');
            setFeaturedProducts(response.data.slice(0, 4)); // Show first 4 items
          } catch (error) {
            console.error('Error fetching featured products:', error.message);
          }
        };
    
        const fetchOffers = async () => {
          try {
            const response = await axios.get('http://localhost:5000/products');
            setOffers(response.data.slice(0, 4)); // Show first 4 deals
          } catch (error) {
            console.error('Error fetching current deals:', error.message);
          }
        };
    
        fetchFeaturedProducts();
        fetchOffers();
      }, []);
    
    return (
        <div>
            <NavigationBar />

            {/* Featured Products Carousel */}
            <Container className="mt-4">
                
                {featuredProducts.length > 0 ? (
                    <Carousel>
                        {featuredProducts.map((product) => (
                            <Carousel.Item key={product.id}>
                                <img
                                    className="d-block w-100 carousel-image"
                                    src={product.image}
                                    alt={product.name}
                                />
                                <Carousel.Caption>
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <Button variant="warning" href={`/products/${product.id}`}>Shop Now</Button>
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
                                    <Card.Img variant="top" src={offer.image} />
                                    <Card.Body>
                                        <Card.Title>{offer.name}</Card.Title>
                                        <Card.Text>{offer.price}</Card.Text>
                                        <Button variant="success" href={`/products/${offer.id}`}>Grab Deal</Button>
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

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>Customer Reviews</h2>
            </section>
            <hr />

            <Footer />
        </div>
    );
};

export default HomePage;