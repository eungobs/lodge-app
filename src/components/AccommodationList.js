import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const AccommodationList = ({ accommodations }) => {
  const [showAllImages, setShowAllImages] = useState(null);
  const navigate = useNavigate(); // Use the hook to get navigate function

  const renderCarousel = (images, id) => (
    <div className="carousel-container">
      <img src={images[0]} alt="Accommodation" className="main-image" />
      <Button onClick={() => setShowAllImages(id)} variant="link" className="view-more-button">
        View More
      </Button>
    </div>
  );

  const renderImageGallery = (images, id) => (
    <div className="gallery-container">
      <Button onClick={() => setShowAllImages(null)} variant="link" className="close-gallery-button">
        Close
      </Button>
      <div className="gallery-images">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Accommodation ${index + 1}`} className="gallery-image" />
        ))}
      </div>
    </div>
  );

  const handleBook = (id) => {
    navigate(`/book/${id}`); // Use navigate to redirect to the booking page
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Our Accommodations</h2>
      <Row>
        {accommodations.length === 0 ? (
          <p className="text-center">No accommodations available.</p>
        ) : (
          accommodations.map((acc) => (
            <Col key={acc.id} md={4} className="mb-4">
              <Card>
                {showAllImages === acc.id ? (
                  renderImageGallery(acc.images, acc.id)
                ) : (
                  renderCarousel(acc.images, acc.id)
                )}
                <Card.Body>
                  <Card.Title>{acc.name}</Card.Title>
                  <Card.Text>{acc.description}</Card.Text>
                  <Card.Text>Price: ${acc.price}</Card.Text>
                  <Form.Check
                    type="checkbox"
                    label="Include Breakfast"
                    checked={acc.breakfastIncluded}
                    disabled
                  />
                  <Form.Check
                    type="checkbox"
                    label="Include Breakfast and Dinner"
                    checked={acc.breakfastAndDinnerIncluded}
                    disabled
                  />
                  <Button className="mt-3" variant="primary" onClick={() => handleBook(acc.id)}>
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

AccommodationList.propTypes = {
  accommodations: PropTypes.array.isRequired,
};

export default AccommodationList;
