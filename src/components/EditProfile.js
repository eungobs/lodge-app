import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import './EditProfile.css'; // Adjust path as needed

const EditProfile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    streetAddress: "",
    city: "",
    stateCountry: "",
    postalCode: "",
    country: "",
    idType: "",
    dateOfBirth: "",
    idNumber: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(db, "users", user.uid);
      try {
        await updateDoc(docRef, userData);
        navigate('/profile'); // Navigate back to the profile page
      } catch (error) {
        console.error("Error updating document:", error);
        alert("There was an error updating your profile. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="edit-profile-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2>Edit Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formStreetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                name="streetAddress"
                value={userData.streetAddress}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={userData.city}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formStateCountry">
              <Form.Label>State/Country</Form.Label>
              <Form.Control
                type="text"
                name="stateCountry"
                value={userData.stateCountry}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={userData.postalCode}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={userData.country}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formIdType">
              <Form.Label>ID Type</Form.Label>
              <Form.Control
                type="text"
                name="idType"
                value={userData.idType}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={userData.dateOfBirth}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formIdNumber">
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                type="text"
                name="idNumber"
                value={userData.idNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProfileImage">
              <Form.Label>Profile Image URL</Form.Label>
              <Form.Control
                type="text"
                name="profileImage"
                value={userData.profileImage}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
