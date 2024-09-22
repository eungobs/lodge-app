import React from 'react';
import './About.css'; // Import the CSS file for styling

const About = () => {
  // Hardcoded policies to be displayed on the About page
  const predefinedPolicies = [
    'Check-in & Check-out: Check-in time is 2:00 PM, and check-out is 11:00 AM. Late check-out may incur additional charges.',
    'Pets: No pets are allowed on the property unless otherwise arranged with management.',
    'Noise: Please maintain a peaceful environment by keeping noise levels to a minimum, especially after 10:00 PM.',
    'Smoking: Smoking is only permitted in designated outdoor areas. Smoking inside rooms or facilities will result in a cleaning fee.',
    'Parking: Vehicles should be parked in the designated parking areas. The lodge is not responsible for any theft or damage to vehicles.',
    'Pool Area: Children must be supervised at all times in the pool area. No diving is allowed in the shallow sections of the pool.',
    'Dam Boat Tours: Boat tours are subject to weather conditions and availability. Please book your spot at the front desk.',
    'Cancellation Policy: Reservations must be canceled 48 hours before the scheduled check-in date to avoid a one-night cancellation fee.',
    'Guest Safety: The lodge is equipped with surveillance cameras for your safety. We are not responsible for lost or stolen items.',
    'Event Space: Events held in the lodge or outdoor areas must conclude by 10:00 PM unless prior arrangements are made.'
  ];

  // Navigation function
  const handleBackButtonClick = () => {
    window.location.href = '/'; // Redirects to the home page
  };

  return (
    <div className="about-container">
      <h2>About Sunset Heaven Lodge</h2>
      <p>
        Sunset Heaven Lodge is a serene getaway destination located in the picturesque mountains of Krugersdorp, Muldersdrift. With beautiful mountain views, it’s a paradise for nature lovers. Our property is home to friendly animals like zebras, ducks, giraffes, swans, and impalas, which can be viewed during the day.
      </p>
      <p>
        Our large dam features a big boat that can accommodate 50 people for tours, taking place from 12:00 PM to 1:15 PM and 3:00 PM to 4:15 PM. The boat includes a restaurant, beautiful restrooms, and a DJ who plays delightful music.
      </p>
      <p>
        Enjoy relaxation at our beachside area, where you can unwind under our pine-tahiti umbrellas. We also have a pool suitable for both children and adults.
      </p>
      <p>
        For your convenience and safety, we offer secure parking with surveillance cameras. Additionally, we have a safe play area for children, supervised by two nannies, allowing parents to enjoy their time exploring the lodge.
      </p>
      <p>
        Inside our lodge, you'll find a restaurant and a bar. Breakfast is served from 6:00 AM to 11:00 AM, lunch from 12:00 PM to 3:00 PM, and dinner from 6:00 PM to 9:00 PM. Our bar is open from 12:00 PM to 2:00 AM.
      </p>
      <p>
        We offer spacious rooms to accommodate families, couples, and individuals, with sharing rooms available for school trips. The lodge's location is simple to access and perfect for a relaxing retreat. Experience the comfort and charm of Sunset Heaven Lodge, where every stay is memorable.
      </p>
      <p>
        For more information, please call us at <strong>011-040-3322</strong> or WhatsApp us at <strong>060-333-2233</strong>.
      </p>

      {/* Policies Section */}
      <h3>Lodge Policies</h3>
      <ul>
        {/* Display predefined policies */}
        {predefinedPolicies.map((policy, index) => (
          <li key={index}>{policy}</li>
        ))}
      </ul>

      {/* Back Button */}
      <button className="back-button" onClick={handleBackButtonClick}>
        Back to Home
      </button>
    </div>
  );
};

export default About;
