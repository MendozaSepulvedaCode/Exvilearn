import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyCQfftVVzJq7hY-e0IiS5a_Ymsm1m9AEZI",
  authDomain: "exvilearn.firebaseapp.com",
  projectId: "exvilearn",
  storageBucket: "exvilearn.appspot.com",
  messagingSenderId: "643817086289",
  appId: "1:643817086289:web:e5937b89508da351114770",
  measurementId: "G-CJ3R20HH3J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const performance = getPerformance(app);

// Exporta las instancias de Firebase
export { app as default, analytics, performance };
