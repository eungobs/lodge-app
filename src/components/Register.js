import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, Spinner } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateCountry, setStateCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        phoneNumber,
        username,
        streetAddress,
        city,
        stateCountry,
        postalCode,
        country,
      });

      // Navigate to the profile page after registration
      navigate("/profile");
    } catch (error) {
      setError("Failed to register. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 p-5" style={{ backgroundColor: '#e0f7fa', borderRadius: '10px', maxWidth: '800px' }}>
      <div className="text-center mb-4">
        <img src="your-logo-url-here" alt="Logo" style={{ width: '80px', borderRadius: '50%' }} />
      </div>
      <h3 className="text-center">Personal Information</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <div className="text-center"><Spinner animation="border" /></div>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formFullName">
              <Form.Control
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Control
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h3 className="text-center mt-4">Account Information</h3>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="formConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h3 className="text-center mt-4">Address Information</h3>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="formStreetAddress">
              <Form.Control
                type="text"
                placeholder="Street address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCity">
              <Form.Control
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="formStateCountry">
              <Form.Control
                type="text"
                placeholder="State/country"
                value={stateCountry}
                onChange={(e) => setStateCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Control
                type="text"
                placeholder="Postal/zip code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group controlId="formCountry">
              <Form.Control
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h3 className="text-center mt-4">Identification Information (optional)</h3>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="formIDType">
              <Form.Control
                type="text"
                placeholder="ID type"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDateOfBirth">
              <Form.Control
                type="date"
                placeholder="Date of birth"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="formIDNumber">
              <Form.Control
                type="text"
                placeholder="ID number"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUploadPicture">
              <Form.Control
                type="file"
                placeholder="Upload picture"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="secondary" type="button" className="mt-4 w-100">
          Newsletter Subscription
        </Button>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="info" type="button">
            Accept terms
          </Button>
          <Button variant="warning" type="button">
            Subscription
          </Button>
        </div>
        <Button variant="success" type="submit" className="mt-4 w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
