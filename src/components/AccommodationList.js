import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

// Default value for accommodations
const defaultAccommodations = [];

// Function component with default props
const AccommodationList = ({ accommodations = defaultAccommodations, handleBook }) => {
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
                <Card.Img variant="top" src={acc.image} />
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

// Prop types for type checking
AccommodationList.propTypes = {
  accommodations: PropTypes.array,
  handleBook: PropTypes.func.isRequired
};

export default AccommodationList;
