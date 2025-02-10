import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { FaTh, FaList, FaStar, FaShoppingCart } from 'react-icons/fa';
import "./ProductListing.css";

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [gridView, setGridView] = useState(true);
    const [sortOption, setSortOption] = useState('');
    const [cart, setCart] = useState([]);
    //const navigate = useNavigate();


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
    
      const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'priceLow') return a.price - b.price;
        if (sortOption === 'priceHigh') return b.price - a.price;
        return 0;
      });
      const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(product => product.id !== productId));
    };


      return(
            <div className="container mt-4">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <Button variant="outline-primary" className='formbtn' onClick={() => setGridView(true)}><FaTh /></Button>
                  <Button variant="outline-secondary" mt= "10" onClick={() => setGridView(false)} className="ms-2"><FaList /></Button>
                </div>

                <Form.Select value={sortOption} className='form' onChange={(e) => setSortOption(e.target.value)}>
                  <option value="">Sort by</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </Form.Select>

              </div>

              <Row className={gridView ? "grid-view" : "list-view"}>
                {sortedProducts.map((product) => (
                  <Col key={product.id} xs={12} md={gridView ? 4 : 12}>
                    
                        <Card className="mb-3">
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                            {product.price}
                            </Card.Text>
                            <Button variant="success" onClick={() => addToCart(product)}>
                                <FaShoppingCart /> 
                            </Button>
                        </Card.Body>
                        </Card>
                    
                  </Col>
                ))}
              </Row>

               {/* Cart Indicator */}
            <div className="cart-indicator">
                <FaShoppingCart size={24} />
                {cart.length > 0 && <Badge bg="danger" className="cart-count">{cart.length}</Badge>}
            </div>
            </div>
          );
        };
    
  export default ProductListing;