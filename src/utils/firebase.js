import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDeBM8YgGS7EE1g4kOoVm4UYgtc6qBcuQQ",
  authDomain: "netflixgpt-69b3c.firebaseapp.com",
  projectId: "netflixgpt-69b3c",
  storageBucket: "netflixgpt-69b3c.appspot.com",
  messagingSenderId: "110194525603",
  appId: "1:110194525603:web:7d546dd0bb901576be4616",
  measurementId: "G-YVZ2YBQZPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();