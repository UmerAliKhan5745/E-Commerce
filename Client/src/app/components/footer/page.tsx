import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <>
      <footer className="mt-5">
        <Container>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <h5>About Us</h5>
              <p>Your brief company description goes here. Share your mission and values.</p>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <h5>Quick Links</h5>
              <ul style={{ color: "black" }}>
                <li>
                  <a style={{ color: "black" }} href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a style={{ color: "black" }} href="/products">
                    Products
                  </a>
                </li>
                <li>
                  <a style={{ color: "black" }} href="/contact">
                    Contact
                  </a>
                </li>
              </ul>
            </Col>
            <Col xs={12} md={4}>
              <h5>Contact Us</h5>
              <p>Email: aumeralikhan@gmail.com</p>
              <p>Phone: 03194315012</p>
            </Col>
          </Row>
        </Container>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "black", color: "wheat" }}
        >
          © {new Date().getFullYear()} CloudStore All rights reserved.
        </div>
      </footer>
    </>
    
  );
}

export default Footer;
