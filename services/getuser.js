const getUserByEmail = async (email) => {
    try {
      const q = query(collection(firestore, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log('No user found with this email.');
        return null;
      } else {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return userData;
      }
    } catch (error) {
      console.error('Error fetching user by email:', error.message);
    }
  };


export default getUserByEmail