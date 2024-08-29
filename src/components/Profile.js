import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="text-center">
                {userData.profileImage && (
                  <Image src={userData.profileImage} roundedCircle fluid style={{ width: '150px', height: '150px' }} />
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
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;




