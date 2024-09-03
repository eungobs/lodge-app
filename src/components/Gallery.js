import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleAccommodationClick = () => {
    navigate('/accommodations');
  };

  const imageUrls = [
    'https://i.pinimg.com/564x/c5/ee/ba/c5eeba67862011f0ce5b956da62917ca.jpg',
    'https://i.pinimg.com/564x/a3/74/cf/a374cf6c47533b78eacdef14de98a5ce.jpg',
    'https://i.pinimg.com/564x/fb/9d/b9/fb9db90add98910cbc879572ecf7a369.jpg',
    'https://i.pinimg.com/564x/35/19/a8/3519a84543d525151876b8285f216b9f.jpg',
    'https://i.pinimg.com/736x/35/9a/b4/359ab4c31fb89c076ab92a6fa49af97c.jpg',
    'https://i.pinimg.com/564x/7a/50/f2/7a50f27f9cb6b0ba3b9c96fcf99644ee.jpg',
    'https://i.pinimg.com/564x/f5/80/01/f58001cb0945e9278c56d4b31a75a682.jpg',
    'https://i.pinimg.com/564x/ea/8f/e9/ea8fe9e9b8d998a3e724e2a1e8c735c9.jpg',
    'https://i.pinimg.com/564x/b4/ae/7b/b4ae7b37b553130c1334ecc9ba3ca639.jpg',
    'https://i.pinimg.com/564x/66/2e/68/662e6808851c530b9f72b922671336fe.jpg',
    'https://i.pinimg.com/564x/a9/1b/13/a91b1359f42f5386a7bafa3ac8489408.jpg',
    'https://i.pinimg.com/564x/bb/2f/c6/bb2fc63c502c4790af875d94fa957c33.jpg',
    'https://i.pinimg.com/564x/1c/89/e7/1c89e7d1620db77552af5f5d7001f581.jpg',
    'https://i.pinimg.com/564x/1e/d5/fc/1ed5fcd48d72956a17d00e980ecd0ab9.jpg',
    'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
    'https://i.pinimg.com/564x/3d/70/d8/3d70d86398745a65aff21b93d1622b30.jpg',
    'https://i.pinimg.com/564x/d7/22/a8/d722a83cb5a22226d5af0501bfc1a2d9.jpg',
    'https://i.pinimg.com/564x/c9/5b/45/c95b458092799497bf472404de5b0603.jpg',
    'https://i.pinimg.com/564x/57/25/03/572503edfb54e4c2d4d8f5bd7f4fc1f2.jpg',
    'https://i.pinimg.com/564x/8f/f3/52/8ff35234dc45ce1fa6857ca5d08f7ce0.jpg',
    'https://i.pinimg.com/564x/4c/40/0a/4c400acd3e25bf2ed939724529bfe55e.jpg',
    'https://i.pinimg.com/564x/82/45/1b/82451b6d2e73f98eb6efd2b34d3c063d.jpg',
    'https://i.pinimg.com/564x/81/02/b2/8102b235c617e3ad66f7f0afcc6b7060.jpg',
    'https://i.pinimg.com/564x/c9/c0/dd/c9c0ddd2a9a9185e8086914ff859e304.jpg',
    'https://i.pinimg.com/564x/cb/f3/6e/cbf36e200aea14f28fff3ef30e22fea5.jpg',
    'https://i.pinimg.com/564x/16/74/af/1674af94543d24387015cc0f33141c40.jpg',
    'https://i.pinimg.com/736x/fe/be/ec/febeec5115fb947d39aba8ef1d347f16.jpg',
    'https://i.pinimg.com/564x/91/35/fe/9135fe3b718082e101e2f8b5f6a3895b.jpg',
    'https://i.pinimg.com/736x/29/59/d7/2959d74ed9ddea62e3f8dc481b529575.jpg',
    'https://i.pinimg.com/736x/0c/09/99/0c0999e7561eb0259f42167eb9e18f3f.jpg',
    'https://i.pinimg.com/736x/f5/21/9d/f5219d419b66568ecca52e77a1a552f4.jpg',
    'https://i.pinimg.com/564x/4f/a2/38/4fa2381ee44a096424a344db3016afb3.jpg',
    'https://i.pinimg.com/564x/a9/71/04/a971042a44a2c37efc0fa2dd3d0575dc.jpg',
    'https://i.pinimg.com/564x/bc/c3/a3/bcc3a3be1c81ee05cbdc64b8ada16387.jpg',
    'https://i.pinimg.com/736x/1e/ba/a5/1ebaa5a104474c3d0bcb870bb23ed148.jpg',
    'https://i.pinimg.com/736x/1b/61/25/1b6125a32a3281111d9e0cae2aa92e04.jpg',
    'https://i.pinimg.com/564x/bc/2c/fa/bc2cfaab1d85d0d569507ab7d5ffb121.jpg',
    'https://i.pinimg.com/564x/bc/c3/a3/bcc3a3be1c81ee05cbdc64b8ada16387.jpg',
    'https://i.pinimg.com/564x/a1/e5/64/a1e56423e0832810cccf94548ff0d738.jpg'
  ];

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

