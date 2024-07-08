import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBbr5ZT5RFqRCBE3oXR-UlsaLMW0McuxeQ",
  authDomain: "teste-e8fc1.firebaseapp.com",
  projectId: "teste-e8fc1",
  storageBucket: "teste-e8fc1.appspot.com",
  messagingSenderId: "636947299691",
  appId: "1:636947299691:web:89eec25d8a113bb961602e",
  measurementId: "G-GJLSMQBQZE"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const perguntasRef = collection(db, 'Perguntas');

export default async function database(){
  return await getDocs(perguntasRef);
}
 
