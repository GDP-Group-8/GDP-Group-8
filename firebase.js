import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
// import {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_APP_ID,
//   FIREBASE_MEASUREMENT_ID,
// } from "@env";
const FIREBASE_API_KEY = "AIzaSyDnFCnRdu6muWnnMtZ414tb02jNFUX291U";
const FIREBASE_AUTH_DOMAIN = "the-best-project-a6ed2.firebaseapp.com";
const FIREBASE_PROJECT_ID = "the-best-project-a6ed2";
const FIREBASE_STORAGE_BUCKET = "the-best-project-a6ed2.appspot.com";
const FIREBASE_MESSAGING_SENDER_ID = "173637986504";
const FIREBASE_APP_ID = "1:173637986504:web:338fc525ad3f959263ddfd"
const FIREBASE_MEASUREMENT_ID = "G-RFGNPX3Y0T";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res.user.uid);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export { auth, logInWithEmailAndPassword, logout };
