import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import './Profile.css'; // Adjust path as needed

const Profile = () => {
  const [userData, setUserData] = useState({});
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page-container">
      <Container className="profile-container">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="profile-card">
              <Card.Body>
                <div className="text-center">
                  {userData.profileImage && (
                    <Image
                      src={userData.profileImage}
                      roundedCircle
                      fluid
                      style={{ width: '150px', height: '150px' }}
                      className="mb-3"
                    />
                  )}
                  <h3>{userData.fullName}</h3>
                  <p>Email: {userData.email}</p>
                  <p>Phone: {userData.phoneNumber}</p>
                  <p>Username: {userData.username}</p>
                  <p>Address: {userData.streetAddress}, {userData.city}, {userData.stateCountry}, {userData.postalCode}, {userData.country}</p>
                  <p>ID Type: {userData.idType}</p>
                  <p>Date of Birth: {userData.dateOfBirth}</p>
                  <p>ID Number: {userData.idNumber}</p>
                </div>
              </Card.Body>
            </Card>
            <div className="text-center mt-4">
              <Button
                variant="primary"
                onClick={() => navigate('/accommodations')}
              >
                View Accommodation
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
