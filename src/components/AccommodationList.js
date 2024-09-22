// AccommodationList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Import your Firebase setup
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      const accommodationsCollection = collection(db, 'accommodationRoom');
      const accommodationsSnapshot = await getDocs(accommodationsCollection);
      const accommodationsList = accommodationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAccommodations(accommodationsList);
    };

    fetchAccommodations();
  }, []);

  const handleBook = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="accommodation-list">
      {accommodations.map(accommodation => (
        <div key={accommodation.id} className="accommodation-card">
          <h3>{accommodation.name}</h3>
          <p>{accommodation.description}</p>
          <p>Price: ${accommodation.price}</p>
          <button onClick={() => handleBook(accommodation.id)}>Book Now</button>
        </div>
      ))}
    </div>
  );
};

export default AccommodationList;

