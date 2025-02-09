import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope,FaFacebook,FaInstagram,FaPhone,FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return(
        <footer className='footer'>
            <Container>
                <Row>
                    {/* Company Info Section */}
                    <Col md={4} className="footer-section">
                        <h5>About Us</h5>
                        <p>Providing high-quality body butters and Kenyan coffee for a luxurious experience.</p>
                    </Col>

                    {/* Contact Details Section */}
                    <Col md={4} className="footer-section">
                        <h5>Contact Us</h5>
                        <p><FaEnvelope className="footer-icon" /> support@bigfive.com</p>
                        <p><FaPhone className="footer-icon" /> +254 712 345 678</p>
                    </Col>

                    {/* Social Media Links */}
                    <Col md={4} className="footer-section">
                        <h5>Follow Us</h5>
                        <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="social-icon facebook" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="social-icon twitter" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="social-icon instagram" />
                        </a>
                        </div>
                    </Col>
                </Row>
                    <hr />
                    <p className="text-center">&copy; 2024 BIG FIVE. All Rights Reserved.</p>
            </Container>
        </footer>

    )
}
export default Footer;