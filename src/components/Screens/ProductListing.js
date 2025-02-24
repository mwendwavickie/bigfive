import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { FaTh, FaList, FaShoppingCart,FaArrowDown,FaArrowUp} from 'react-icons/fa';
import "./ProductListing.css";
import NavigationBar from '../Navbar';

const ProductListing = () => {  
    const [products, setProducts] = useState([]);
    const [gridView, setGridView] = useState(true);
    const [sortOption, setSortOption] = useState(''); 
    const [visibleProducts, setVisibleProducts] = useState(6);// initially show 6 products.
    const [cart, setCart ] = useState([]);// Ensure cart defaults to an empty array

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
        if (!cart.some(item => item.id === product.id)) {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };


    // Navigate to ProductCard.js when a product is clicked
    const handleProductClick = (product) => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="container mt-4">
            {/* View and Sort Options */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="sort-btn">
                    <Button variant={gridView ? "primary" : "outline-primary"} onClick={() => setGridView(true)}>
                        <FaTh />
                    </Button>
                    <Button variant={!gridView ? "primary" : "outline-secondary"} onClick={() => setGridView(false)}>
                        <FaList />
                    </Button>
                </div>
                <Form.Select value={sortOption} className="form" onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">Sort by</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                </Form.Select>
            </div>

            {/* Product Cards */}
            <Row className={gridView ? "grid-view" : "list-view"}>
                {sortedProducts.slice(0, visibleProducts).map((product) => {
                    const isInCart = Array.isArray(cart) && cart.some(item => item.id === product.id);

                    return (
                        <Col key={product.id} xs={12} md={gridView ? 4 : 12}>
                            <Card className="mb-3 product-card" onClick={() => handleProductClick(product)}>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.price}</Card.Text>
                                    <Button
                                        className={`cartbtn ${cart.some(item => item.id === product.id) ? "disabled" : ""}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}
                                        disabled={cart.some(item => item.id === product.id)}
                                    >
                                        {cart.some(item => item.id === product.id) ? "Added to Cart" : "Add to Cart"}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {/* Show More / Show Less Buttons */}
            <div className="text-center mt-3">
                {visibleProducts < sortedProducts.length ? (
                    <Button variant="outline" onClick={() => setVisibleProducts(visibleProducts + 6)}>
                        Show More <FaArrowDown />
                    </Button>
                ) : visibleProducts > 6 ? (
                    <Button variant="outline" onClick={() => setVisibleProducts(6)}>
                        Show Less <FaArrowUp />
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default ProductListing;
