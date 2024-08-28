import React from "react";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container className="mt-5">
      <h2 className="text-center">Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>Welcome, {user.email}</Card.Title>
          <Card.Text>Your profile details are displayed here.</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
