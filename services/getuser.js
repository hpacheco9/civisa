import { getFirestore, query, where, getDocs, collection } from "firebase/firestore";

const getUserByEmail = async (email) => {
  if (!email) {
    console.error('No email provided.');
    return null;
  }

  try {
    const firestore = getFirestore();  // Initialize Firestore instance inside the function
    const q = query(collection(firestore, 'users'), where('email', '==', email));  // Query Firestore for the email

    const querySnapshot = await getDocs(q);  // Get the docs matching the query

    if (querySnapshot.empty) {
      console.log('No user found with this email.');
      return null;  // Return null if no user is found
    } else {
      const userDoc = querySnapshot.docs[0];  // Take the first document (assuming one user per email)
      const userData = userDoc.data();  // Extract user data
      return userData;  // Return the user data
    }
  } catch (error) {
    console.error('Error fetching user by email:', error.message);
    return null;  // Return null in case of error
  }
};

export default getUserByEmail;
