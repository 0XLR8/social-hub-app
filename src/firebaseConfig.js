import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyAAlmvvkg1NyOaZbQl4AIXtDfe3SzeaF68',
  authDomain: "social-hub-dbbce.firebaseapp.com",
  projectId: "social-hub-dbbce",
  storageBucket: "social-hub-dbbce.appspot.com",
  messagingSenderId: "751262334794",
  appId: "1:751262334794:web:054f2f01084b3825550bb3"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
