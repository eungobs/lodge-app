// firebase.js
import { auth, db, storage } from './firebaseConfig';  // Import auth, db, and storage
import { doc, getDoc } from 'firebase/firestore';

// Define and export the function
export const getAccommodationFromFirebase = async (id) => {
  const docRef = doc(db, 'accommodations', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('No such document!');
  }
};

// Export other items if needed
export { auth, db, storage };


