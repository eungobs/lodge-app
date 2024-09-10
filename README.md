Sunset Heaven Lodge
Overview
Sunset Heaven Lodge is a comprehensive hotel management application designed to enhance the booking experience for users and streamline operations for administrators. The application provides robust features for user authentication, accommodation management, and booking, all with a focus on intuitive design and usability.

Features
User Authentication
Firebase Authentication: Secure registration and login functionality.
User Registration: New users can register to gain full access to all app features.
User Profile Management: Post-registration, users can edit their profile details and delete their accounts.
Navigation and Functionality
Initial Registration: Upon opening the Sunset Heaven Lodge app, users will first encounter options to register.
Register: Users must register to access full functionality including booking and payment.
Profile Navigation: After registering, users are directed to their profile where they can:
Edit profile details.
Delete their account if desired.
Access Restrictions: Users who are not registered can only view accommodation images and details. They will not have access to booking or payment features.
Accommodation Listings
Photo Gallery: Browse images of the hotel.
Map Integration: View the hotel’s location on an interactive map.
Price Details: Check the cost per night and other pricing information.
Basic Information: Review essential details including address and star rating.
Hotel Facilities & Policies: See a list of amenities and policies.
Call-to-Action Button: Book or view more details about the accommodation.
Sharing Button: Share details of accommodations with others.
Favourites Button: Save accommodations to a favourites list.
Booking Functionality
Date Selection: Choose check-in and check-out dates.
Room and Guest Details: Specify number of rooms and guests.
Payment Integration: Process payments securely through a chosen payment gateway.
User Profile
View/Edit Profile: Manage personal profile information.
View Bookings: Access details of past and upcoming bookings.
View Favourites: Review and manage saved favourite accommodations.

Admin Panel
github link: https://github.com/eungobs/lodge-admin.git
Admin Authentication: Admins log in to access the CMS.
CMS Login Credentials:
Email: eungo@gmail.com
Password: 123456
Add Accommodations: Admins can add new accommodations with details such as room type, capacity, price, and availability.
View Reservations: Admins can view reservation details including guest and room information.
Manage Reservations: Approve, modify, or cancel bookings.
Update Accommodation Details: Adjust availability, pricing, and descriptions.
Data Storage
Firebase Firestore/Real-time Database: Securely store accommodation listings, user data, and booking information.
State Management
Redux Toolkit: Efficiently manage the application's state.
Additional Features
Search Functionality: Find accommodations by location, price, and other filters.
Reviews & Ratings: Leave and view reviews and ratings.
Notifications: Receive alerts for booking confirmations, updates, and promotions.
Security
Data Protection: Implement security measures to protect user data and transactions.
Scalability & Performance
Scalable Architecture: Designed to handle extensive user and accommodation data.
Optimized Performance: Ensures a smooth and responsive user experience.
Compliance
Regulations and Laws: Adheres to relevant data protection and transaction regulations.
Responsive Design
Cross-Device Compatibility: The application is designed to work on various devices and screen sizes.
Technology Stack
Frontend: React.js
Backend: Firebase Firestore/Real-time Database
State Management: Redux Toolkit
Authentication: Firebase Authentication
Payments: Paypal
UI/UX Design: Designed using Figma
Coding Environment: Visual Studio Code
Testing
For testing the payment functionality, you can use the following test card details:

Card Type: VISA
Card Number: 4032 0385 4201 3317
Expiry Date: 09/2029
CVC Code: Any 3-digit code
Repository
GitHub Repository: Sunset Heaven Lodge GitHub
CMS Branch: ldge-admin for the content management system
Setup and Installation
Clone the Repository


git clone https://github.com/eungobs/sunset-heaven-lodge.git
cd sunset-heaven-lodge
Install Dependencies


npm install
Set Up Firebase

Create a Firebase project and configure Firebase Authentication and Firestore.
Add your Firebase configuration to the app.
Run the Application


npm start
Build for Production


npm run build
Contributing
Contributions are welcome! Please follow the standard pull request process and ensure that your changes are well-documented. For detailed guidelines, refer to the CONTRIBUTING.md file.

Figma link:https://www.figma.com/design/F8cn3hGq5zNWooIwWXMB67/lodge-sckeches?node-id=54-126&t=b1DDil8UNUvNWFai-1

License
This project is licensed under the MIT License. See the LICENSE file for details.
