import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjuD_hzD_69LlRWLNkS9LQYmqx5Z-erCs",
  authDomain: "govoyagesdeals.firebaseapp.com",
  projectId: "govoyagesdeals",
  storageBucket: "govoyagesdeals.firebasestorage.app",
  messagingSenderId: "407265340521",
  appId: "1:407265340521:web:4e3fef304e0ea44f8dc6f8",
  measurementId: "G-CVLVCG3QCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Export a function to get the current user's token
export const getCurrentUserToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};

export { app, db, auth, analytics };