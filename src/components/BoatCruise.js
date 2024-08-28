// src/components/BoatCruise.js
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const BoatCruise = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const pricePerAdult = 150;
  const pricePerChild = 80;

  const calculateTotal = () => {
    return adults * pricePerAdult + children * pricePerChild;
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Book a Boat Cruise</h2>
      <Form>
        <Form.Group controlId="formAdults">
          <Form.Label>Number of Adults</Form.Label>
          <Form.Control
            type="number"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            min="1"
          />
        </Form.Group>
        <Form.Group controlId="formChildren" className="mt-3">
          <Form.Label>Number of Children</Form.Label>
          <Form.Control
            type="number"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            min="0"
          />
        </Form.Group>
        <h4 className="mt-4">Total Price: ${calculateTotal()}</h4>
        <Button className="mt-3" variant="primary" type="submit">
          Book Now
        </Button>
      </Form>
    </Container>
  );
};

export default BoatCruise;
