import * as firebase from "firebase/app";
import "firebase/auth";

/*After we imported firabse and firebase/auth
  we can initialize our app using firebase.initializeApp

  All process.env viarables ar in .env file we use them from there
  */

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});

export { app as firebase };
