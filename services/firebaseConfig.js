import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from '@env';

// Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // If already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
