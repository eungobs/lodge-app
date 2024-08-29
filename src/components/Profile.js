import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
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
        } else {
          console.log("No such document!");
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5 p-5" style={{ backgroundColor: '#f1f8e9', borderRadius: '10px', maxWidth: '800px' }}>
      <h3 className="text-center mb-4">Profile Information</h3>
      {userData && (
        <Row>
          <Col md={6}>
            <h5>Full Name:</h5>
            <p>{userData.fullName}</p>
          </Col>
          <Col md={6}>
            <h5>Email:</h5>
            <p>{userData.email}</p>
          </Col>
          <Col md={6}>
            <h5>Phone Number:</h5>
            <p>{userData.phoneNumber}</p>
          </Col>
          <Col md={6}>
            <h5>Username:</h5>
            <p>{userData.username}</p>
          </Col>
          <Col md={6}>
            <h5>Street Address:</h5>
            <p>{userData.streetAddress}</p>
          </Col>
          <Col md={6}>
            <h5>City:</h5>
            <p>{userData.city}</p>
          </Col>
          <Col md={6}>
            <h5>State/Country:</h5>
            <p>{userData.stateCountry}</p>
          </Col>
          <Col md={6}>
            <h5>Postal Code:</h5>
            <p>{userData.postalCode}</p>
          </Col>
          <Col md={6}>
            <h5>Country:</h5>
            <p>{userData.country}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;


