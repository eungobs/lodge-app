import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import './AccommodationList.css';
// Sample accommodation data for testing
const sampleAccommodations = [
  {
    id: 1,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 2,
    images: [
      'https://i.pinimg.com/564x/07/77/69/0777694f7f578f84767ab82c9eb5fa05.jpg',
      'https://i.pinimg.com/564x/9e/64/d0/9e64d0f920139b3ca34b4d66bd586974.jpg',
      'https://i.pinimg.com/564x/a4/0d/e9/a40de902710799f00c5949b548cf0e1c.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 3,
    images: [
      'https://i.pinimg.com/564x/6b/18/84/6b1884dd60007688fc10d2f5c386bdec.jpg',
      'https://i.pinimg.com/564x/9e/64/d0/9e64d0f920139b3ca34b4d66bd586974.jpg',
      'https://i.pinimg.com/564x/0e/ab/c1/0eabc11bbbcccd56a34c858f2a084342.jpg'
    ],
    name: 'Standard Room',
    description: 'A comfortable room with essential amenities.',
    price: 100,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: false,
  },
  {
    id: 4,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 5,
    images: [
      'https://i.pinimg.com/564x/6b/18/84/6b1884dd60007688fc10d2f5c386bdec.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/564x/0e/ab/c1/0eabc11bbbcccd56a34c858f2a084342.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
   id: 6,
    images: [
      'https://i.pinimg.com/564x/e9/a5/6d/e9a56dbd2b6337eff4b4af6061d833ed.jpg',
      'https://i.pinimg.com/564x/f5/24/55/f524557f25ec4ca5380ce17333ce951b.jpg',
      'https://i.pinimg.com/564x/7f/cc/49/7fcc49c98c9b6bd5169083143c3d7d19.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 7,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 8,
    images: [
      'https://i.pinimg.com/564x/b6/db/1c/b6db1c138a19f8dd4fcdcf8758915954.jpg',
      'https://i.pinimg.com/564x/19/21/69/19216987d1a56c843dffb3c2efebb7b4.jpg',
      'https://i.pinimg.com/564x/d6/0a/4b/d60a4bf5f85376022abcba0a2b56b07b.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 9,
    images: [
      'https://i.pinimg.com/564x/e9/a5/6d/e9a56dbd2b6337eff4b4af6061d833ed.jpg',
      'https://i.pinimg.com/564x/f5/24/55/f524557f25ec4ca5380ce17333ce951b.jpg',
      'https://i.pinimg.com/564x/7f/cc/49/7fcc49c98c9b6bd5169083143c3d7d19.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 10,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 11,
    images: [
      'https://i.pinimg.com/564x/60/49/d7/6049d77f4f3f278dc738e0cf29b21f7e.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 12,
    images: [
      'https://i.pinimg.com/564x/b6/db/1c/b6db1c138a19f8dd4fcdcf8758915954.jpg',
      'https://i.pinimg.com/564x/19/21/69/19216987d1a56c843dffb3c2efebb7b4.jpg',
      'https://i.pinimg.com/564x/d6/0a/4b/d60a4bf5f85376022abcba0a2b56b07b.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 13,
    images: [
      'https://i.pinimg.com/564x/b8/43/f7/b843f73e1331dd74f6a4d607cf331fda.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 14,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 15,
    images: [
      'https://i.pinimg.com/564x/70/ae/ba/70aebac87da85b4b180068444473a178.jpg',
      'https://i.pinimg.com/564x/d8/22/12/d82212f20b9ea24fc999ce6cad4ffb63.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  // Add more rooms as needed
];

const AccommodationList = ({ accommodations = sampleAccommodations, handleBook }) => {
  const [showAllImages, setShowAllImages] = useState(null);

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
                    onChange={(e) =>
                      handleBook(acc.id, { breakfastIncluded: e.target.checked })
                    }
                    disabled
                  />
                  <Form.Check
                    type="checkbox"
                    label="Include Breakfast and Dinner"
                    checked={acc.breakfastAndDinnerIncluded}
                    onChange={(e) =>
                      handleBook(acc.id, {
                        breakfastAndDinnerIncluded: e.target.checked,
                      })
                    }
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
  handleBook: PropTypes.func.isRequired
};

export default AccommodationList;