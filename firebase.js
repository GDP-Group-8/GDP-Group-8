import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Add this import

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

FIREBASE_API_KEY = "AIzaSyDnFCnRdu6muWnnMtZ414tb02jNFUX291U";
FIREBASE_AUTH_DOMAIN = "the-best-project-a6ed2.firebaseapp.com";
FIREBASE_PROJECT_ID = "the-best-project-a6ed2";
FIREBASE_STORAGE_BUCKET = "the-best-project-a6ed2.appspot.com";
FIREBASE_MESSAGING_SENDER_ID = "173637986504";
FIREBASE_APP_ID = "1:173637986504:web:338fc525ad3f959263ddfd";
FIREBASE_MEASUREMENT_ID = "G-RFGNPX3Y0T";
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";

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
const storage = getStorage(app); // Add this line
const storageRef = ref(storage);
const videosRef = ref(storageRef, "videos");
const yourIp = "http://192.168.170.179:5000";
// const yourIp = "https://gdp-api.herokuapp.com";
const uploadVideo = async (video) => {
  //upload into videos folder in the storage
  const videoRef = ref(videosRef, "video");
  const uploadTask = await uploadBytes(videoRef, video);
  console.log(uploadTask);
  //get the download url
  const downloadURL = await getDownloadURL(uploadTask.ref);
  console.log(downloadURL);
  //get path of the video in the storage
  const path = uploadTask.ref.fullPath;
  console.log(path);
  return downloadURL;
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    //axios post to the backend with body containing user.uid and name
    const res2 = await axios.post(yourIp + "/members/", {
      memberID: user.uid,
      name: name,
      email: email,
      gymOwner: "hzaaU5hcJMgOMbPdDWdUzxn37zU2",
      membershipType: "",
      admin: false,
    });
    await res2;
    console.log(void res2);
    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  uploadVideo,
  yourIp,
};
