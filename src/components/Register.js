import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, Spinner } from "react-bootstrap";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  const [idType, setIdType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [image, setImage] = useState(null); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [subscriptionSuccessful, setSubscriptionSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setError("The email address is already in use. Please use a different email.");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let imageUrl = ""; 

      if (image) {
        const imageRef = ref(storage, `user-images/${user.uid}`);
        await uploadBytes(imageRef, image); 
        imageUrl = await getDownloadURL(imageRef);
      }

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
        idType,
        dateOfBirth,
        idNumber,
        profileImage: imageUrl, 
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.code === 'auth/email-already-in-use') {
        setError("The email address is already in use. Please use a different email.");
      } else {
        setError(`Failed to register: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterClick = () => {
    setNewsletterSubscribed(!newsletterSubscribed);
    if (!newsletterSubscribed) {
      alert("Successfully subscribed to the newsletter!");
    } else {
      alert("Newsletter subscription cancelled");
    }
  };

  const handleTermsClick = () => {
    setTermsAccepted(!termsAccepted);
    if (!termsAccepted) {
      alert("Terms accepted successfully!");
    } else {
      alert("Terms not accepted");
    }
  };

  const handleSubscriptionClick = () => {
    setSubscriptionSuccessful(true);
    alert("Successfully subscribed!");
  };

  return (
    <Container className="mt-5 p-5" style={{ backgroundColor: '#e0f7fa', borderRadius: '10px', maxWidth: '800px' }}>
      <div className="text-center mb-4">
        <img src="https://i.pinimg.com/564x/d2/c1/36/d2c136b481507a78ad8eee3933a6026d.jpg" alt="Logo" style={{ width: '80px', borderRadius: '50%' }} />
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
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDateOfBirth">
              <Form.Control
                type="date"
                placeholder="Date of birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
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
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <h3 className="text-center mt-4">Profile Picture (optional)</h3>
        <Row className="mt-3">
          <Col>
            <Form.Group controlId="formImage">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="secondary" type="button" className="mt-4 w-100" onClick={handleNewsletterClick}>
          {newsletterSubscribed ? '✓ Newsletter Subscribed' : 'Subscribe to Newsletter'}
        </Button>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="info" type="button" onClick={handleTermsClick}>
            {termsAccepted ? '✓ Terms Accepted' : 'Accept Terms'}
          </Button>
          <Button variant="warning" type="button" onClick={handleSubscriptionClick}>
            Subscribe
          </Button>
        </div>
        <Button variant="success" type="submit" className="mt-4 w-100">
          Register
        </Button>
      </Form>
      {subscriptionSuccessful && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          Subscription successful! Thank you for subscribing.
        </div>
      )}
    </Container>
  );
};

export default Register;