import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Profile.css'; // Adjust path as needed

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      console.log("User:", user); // Debug: Check if user is logged in
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data()); // Debug: Log the data fetched from Firestore
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    // Navigate to the profile edit page
    navigate('/edit-profile'); // Make sure to create this route
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      // Show confirmation dialog
      const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

      if (confirmDelete) {
        try {
          // Delete the user's document in Firestore
          await deleteDoc(doc(db, "users", user.uid));

          // Delete the user's authentication account
          await user.delete();

          // Navigate to the home or login page after deletion
          navigate('/');
        } catch (error) {
          console.error("Error deleting account:", error);
          alert("There was an error deleting your account. Please try again.");
        }
      }
    }
  };

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
                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    onClick={() => navigate('/accommodations')}
                  >
                    View Accommodation
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="ms-2"
                    onClick={handleEditProfile}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit Profile
                  </Button>
                </div>
                <div className="text-center mt-4">
                  <Button
                    variant="danger"
                    onClick={handleDeleteAccount}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete Account
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;




