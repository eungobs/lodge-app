import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

// Import images
import image1 from '../images/view-luxurious-cruise-ship.png';
import image2 from '../images/umbrella-chair-around-swimming-pool.png';
import image3 from '../images/photorealistic-wooden-house-with-timber-structure.png';
import image4 from '../images/luxury-thai-massage-pavilion.png';
import image5 from '../images/luxurious-villa-with-modern-architectural-design (1).png'; // Updated name

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0">
      {/* Header with logo and buttons */}
      <Row className="header align-items-center">
        <Col md={4} className="d-flex align-items-center">
          <img src="path_to_logo_image" alt="Hotel Logo" className="logo" />
        </Col>
        <Col md={8} className="text-center">
          <Button 
            variant="primary" 
            className="mx-2"
            onClick={() => navigate('/register')} // Navigate to Register page
          >
            Register
          </Button>
          <Button 
            variant="secondary" 
            className="mx-2"
            onClick={() => navigate('/login')} // Navigate to Login page
          >
            Login
          </Button>
        </Col>
      </Row>

      {/* Welcome Text */}
      <Container className="text-center mt-5">
        <h2>Welcome to Sunset Haven Lodge</h2>
      </Container>

      {/* Rotating images */}
      <div className="image-rotator">
        <img src={image1} alt="Image 1" className="rotating-image" />
        <img src={image2} alt="Image 2" className="rotating-image" />
        <img src={image3} alt="Image 3" className="rotating-image" />
        <img src={image4} alt="Image 4" className="rotating-image" />
        <img src={image5} alt="Image 5" className="rotating-image" />
      </div>

      {/* Main Content */}
      <Container className="mt-5">
        <Row>
          <Col>
            <h3>Upcoming Events</h3>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Summer Music Festival</Card.Title>
                <Card.Text>August 30th</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Family Fun Day</Card.Title>
                <Card.Text>September 15th</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <h3>Special Offers</h3>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Book 3 nights, get 1 free!</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>20% off Boat Cruise for early bookings!</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default LandingPage;
