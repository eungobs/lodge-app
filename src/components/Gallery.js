import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebaseConfig'; // Ensure this path is correct
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './Gallery.css';

const Gallery = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Adjust the path to your Firebase Storage 'gallery' folder
        const storageRef = ref(storage, 'gallery/');
        const imageRefs = await listAll(storageRef);
        const urls = await Promise.all(
          imageRefs.items.map(async (imageRef) => {
            const url = await getDownloadURL(imageRef);
            return url;
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching images from Firebase Storage', error);
      }
    };

    fetchImages();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleAccommodationClick = () => {
    navigate('/accommodations');
  };

  const handleImageClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://www.pngkey.com/png/full/303-3035126_facebook-circle-icon-png-download-facebook-icon-50x50.png" alt="Facebook" />
        </a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
          <img src="https://static.vecteezy.com/system/resources/previews/016/716/450/original/tiktok-icon-free-png.png" alt="TikTok" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="https://vectorseek.com/wp-content/uploads/2023/07/Twitter-X-Logo-Vector-01-2.jpg" alt="Twitter" />
        </a>
      </div>
      <div className="contact-info">
        <p>Call us at: <a href="tel:011-040-3322">011-040-3322</a></p>
        <p>WhatsApp us at: <a href="https://wa.me/27603332233" target="_blank" rel="noopener noreferrer">060-333-2233</a></p>
      </div>
      <div className="image-gallery">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Gallery ${index + 1}`}
            className="gallery-image"
            onClick={() => handleImageClick(imageUrl)}
          />
        ))}
      </div>
      <div className="buttons">
        <button className="back-button" onClick={handleBackClick}>Back to Landing Page</button>
        <button onClick={handleAccommodationClick}>Book Accommodation</button>
      </div>
    </div>
  );
};

export default Gallery;


