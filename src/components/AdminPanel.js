import React, { useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAccommodations } from "../features/accommodationsSlice";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.list);

  useEffect(() => {
    const fetchAccommodations = async () => {
      const querySnapshot = await getDocs(collection(db, "accommodations"));
      const accommodationsData = querySnapshot.docs.map((doc) => doc.data());
      dispatch(setAccommodations(accommodationsData));
    };

    fetchAccommodations();
  }, [dispatch]);

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
          {accommodations.map((acc, index) => (
            <tr key={index}>
              <td>{acc.name}</td>
              <td>{acc.description}</td>
              <td>${acc.price}</td>
              <td>
                <Button variant="warning" className="me-2">
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPanel;
