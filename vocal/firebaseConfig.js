import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCR7jlV-IariO2ctKqKZKU9E4OJK7Em5x8",
  authDomain: "englishstepbystep-88acf.firebaseapp.com",
  databaseURL: 'https://englishstepbystep-88acf.firebaseio.com',
  projectId: "englishstepbystep-88acf",
  storageBucket: "englishstepbystep-88acf.appspot.com",
  messagingSenderId: "978956465129",
  appId: "1:978956465129:web:e2a6813f4bc2ea1dbfd178",
  measurementId: "G-L490CPWF4R"
};
const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
