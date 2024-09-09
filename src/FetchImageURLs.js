import React, { useEffect, useState } from 'react';
import { db } from './firebaseconfig'; // Import Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const FetchImageURLs = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'images'));
        const urls = querySnapshot.docs.map(doc => doc.data().url);
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching images from Firestore', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
      <div className="gallery">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Gallery ${index + 1}`} style={{ width: '200px', height: 'auto', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default FetchImageURLs;
