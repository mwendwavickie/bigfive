import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { FaTh, FaList, FaStar, FaShoppingCart } from 'react-icons/fa';
import "./ProductListing.css";

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [gridView, setGridView] = useState(true);
    const [sortOption, setSortOption] = useState('');

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

      return(
            <div className="container mt-4">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <Button variant="outline-primary" onClick={() => setGridView(true)}><FaTh /></Button>
                  <Button variant="outline-secondary" onClick={() => setGridView(false)} className="ms-2"><FaList /></Button>
                </div>
                <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
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
                        <Button className='cartBtn'>
                            <FaShoppingCart />Add to Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          );
        };
    
  export default ProductListing;