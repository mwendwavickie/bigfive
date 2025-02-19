import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { FaTh, FaList, FaShoppingCart } from 'react-icons/fa';
import "./ProductListing.css";

const ProductListing = ({ cart = [], setCart }) => {  // Ensure cart defaults to an empty array
    const [products, setProducts] = useState([]);
    const [gridView, setGridView] = useState(true);
    const [sortOption, setSortOption] = useState('');

    const navigate = useNavigate();

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Sort products based on selection
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'priceLow') return a.price - b.price;
        if (sortOption === 'priceHigh') return b.price - a.price;
        return 0;
    });

    // Add product to cart
    const addToCart = (product) => {
        if (!Array.isArray(cart)) return; // Ensure cart is an array before modifying

        // Check if the product is already in the cart using filter()
        const isInCart = cart.filter(item => item.id === product.id).length > 0;

        if (!isInCart) {
            setCart([...cart, product]); // Add product if not in cart
        }
    };

    // Navigate to ProductCard.js when a product is clicked
    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product } });
    };

    return (
        <div className="container mt-4">
            {/* View and Sort Options */}
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <Button variant="outline-primary" className='formbtn' onClick={() => setGridView(true)}>
                        <FaTh />
                    </Button>
                    <Button variant="outline-secondary" className="ms-2" onClick={() => setGridView(false)}>
                        <FaList />
                    </Button>
                </div>
                <Form.Select value={sortOption} className='form' onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">Sort by</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                </Form.Select>
            </div>

            {/* Product Cards */}
            <Row className={gridView ? "grid-view" : "list-view"}>
                {sortedProducts.map((product) => {
                    const isInCart = Array.isArray(cart) && cart.filter(item => item.id === product.id).length > 0;

                    return (
                        <Col key={product.id} xs={12} md={gridView ? 4 : 12}>
                            {/* Clickable Card for Navigation */}
                            <Card className="mb-3 product-card" onClick={() => handleProductClick(product)}>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.price}</Card.Text>
                                    {/* Prevents event bubbling on Add to Cart button */}
                                    <Button
                                        variant={isInCart ? "secondary" : "success"}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}
                                    >
                                        <FaShoppingCart /> {isInCart ? "Added" : "Add to Cart"}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default ProductListing;
