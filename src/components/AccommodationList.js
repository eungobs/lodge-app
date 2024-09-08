import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { FaShareAlt, FaStar } from 'react-icons/fa'; // Add icons for share and rating
import './AccommodationList.css'; // Ensure you include your CSS file

const AccommodationList = ({ accommodations }) => {
  const [showAllImages, setShowAllImages] = useState(null);
  const [showModal, setShowModal] = useState(null); // State for showing modal
  const [selectedImage, setSelectedImage] = useState(null); // State for full image modal
  const navigate = useNavigate();

  const handleViewMore = (id) => {
    setShowAllImages(id);
    setShowModal(true); // Show the modal with detailed view
  };

  const handleCloseModal = () => {
    setShowAllImages(null);
    setShowModal(null);
    setSelectedImage(null);
  };

  const handleBook = (id) => {
    navigate(`/book/${id}`); // Pass the ID to the booking page
  };

  const handleShare = (imageUrl) => {
    const url = `https://api.whatsapp.com/send?text=Check%20out%20this%20accommodation:%20${encodeURIComponent(imageUrl)}`;
    window.open(url, '_blank');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
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
                <div className="carousel-container">
                  <img src={acc.images[0]} alt="Accommodation" className="main-image" onClick={() => handleImageClick(acc.images[0])} />
                  <Button onClick={() => handleViewMore(acc.id)} variant="link" className="view-more-button">
                    View More
                  </Button>
                </div>
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

      {/* Modal for Viewing More Details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Accommodation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAllImages && (
            <>
              <div className="gallery-container">
                <Button onClick={handleCloseModal} variant="link" className="close-gallery-button">
                  Close
                </Button>
                <div className="gallery-images">
                  {accommodations.find(acc => acc.id === showAllImages).images.map((image, index) => (
                    <img key={index} src={image} alt={`Accommodation ${index + 1}`} className="gallery-image" onClick={() => handleImageClick(image)} />
                  ))}
                </div>
              </div>
              <Button className="share-button" onClick={() => handleShare(accommodations.find(acc => acc.id === showAllImages).images[0])}>
                <FaShareAlt /> Share
              </Button>
              <div className="amenities-list">
                <h5>Amenities</h5>
                {accommodations.find(acc => acc.id === showAllImages).amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span>{amenity}</span>
                  </div>
                ))}
                <p><strong>Check-In:</strong> {accommodations.find(acc => acc.id === showAllImages).checkInTime}</p>
                <p><strong>Check-Out:</strong> {accommodations.find(acc => acc.id === showAllImages).checkOutTime}</p>
                <Button className="rate-us-button" variant="primary">Rate Us <FaStar /></Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal for Full Image View */}
      <Modal show={selectedImage !== null} onHide={() => setSelectedImage(null)} size="lg">
        <Modal.Body>
          <img src={selectedImage} alt="Full View" className="modal-image" />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

AccommodationList.propTypes = {
  accommodations: PropTypes.array.isRequired,
};

export default AccommodationList;



