// src/components/AdminPanel.js
import React, { useEffect, useState } from "react";
import { Container, Button, Table, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAccommodations } from "../features/accommodationsSlice"; // Ensure correct import path
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.list);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        // Fetch accommodations from Firestore
        const querySnapshot = await getDocs(collection(db, "accommodations"));
        const accommodationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Dispatch the fetched accommodations to the store
        dispatch(setAccommodations(accommodationsData));
      } catch (err) {
        // Handle errors
        setError("Failed to fetch accommodations");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAccommodations();
  }, [dispatch]);

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log("Edit accommodation with id:", id);
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log("Delete accommodation with id:", id);
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h2>Admin Panel</h2>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <h2 className="text-center">Admin Panel</h2>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Ensure accommodations is always defined and check for empty list
  const isAccommodationsEmpty = !Array.isArray(accommodations) || accommodations.length === 0;

  return (
    <Container className="mt-5">
      <h2 className="text-center">Admin Panel</h2>
      <Button variant="primary" className="mb-3">
        Add New Accommodation
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isAccommodationsEmpty ? (
            <tr>
              <td colSpan="4" className="text-center">No accommodations available</td>
            </tr>
          ) : (
            accommodations.map((acc) => (
              <tr key={acc.id}>
                <td>{acc.name}</td>
                <td>{acc.description}</td>
                <td>${acc.price}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(acc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(acc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPanel;


