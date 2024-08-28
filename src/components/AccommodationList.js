// src/components/AccommodationList.js
import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const AccommodationList = ({ accommodations, handleBook }) => {
  return (
    <Container className="mt-5">
      <h2 className="text-center">Our Accommodations</h2>
      <Row>
        {accommodations.map((acc) => (
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
        ))}
      </Row>
    </Container>
  );
};

export default AccommodationList;
