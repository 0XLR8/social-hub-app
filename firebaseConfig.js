import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyAAlmvvkg1NyOaZbQl4AIXtDfe3SzeaF68',
  authDomain: "social-hub-dbbce.firebaseapp.com",
  projectId: "social-hub-dbbce",
  storageBucket: "social-hub-dbbce.appspot.com",
  messagingSenderId: "751262334794",
  appId: "1:751262334794:web:054f2f01084b3825550bb3"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);