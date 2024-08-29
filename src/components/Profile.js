import React, { useState, useEffect } from "react";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { setUser } from "../features/userSlice"; // Make sure this path is correct

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);
          
          if (docSnap.exists()) {
            setDisplayName(docSnap.data().displayName || "");
            setPhoneNumber(docSnap.data().phoneNumber || "");
          } else {
            setError("No such document!");
          }
        } catch (error) {
          setError("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName,
        phoneNumber
      });

      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        displayName,
        phoneNumber
      });

      dispatch(setUser({ ...user, displayName, phoneNumber }));
      alert("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <h2 className="text-center">Profile</h2>
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-5">
        <h2 className="text-center">Profile</h2>
        <Card>
          <Card.Body>
            <Card.Title>No User Data</Card.Title>
            <Card.Text>Please log in to see your profile details.</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center">Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Body>
          <Card.Title>Welcome, {user.email}</Card.Title>
          <Card.Text>
            <strong>Name:</strong> {displayName || "Not provided"}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>Phone:</strong> {phoneNumber || "Not provided"}
          </Card.Text>
          <Button 
            variant="primary"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;

