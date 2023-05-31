import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBCH5aFnPaEuzh9Xe2ydXv-kMYpcbZ1dTA",
  authDomain: "intrainteract.firebaseapp.com",
  projectId: "intrainteract",
  storageBucket: "intrainteract.appspot.com",
  messagingSenderId: "793588233308",
  appId: "1:793588233308:web:4e2a7f8971e0e362d0a299"
};


firebase.initializeApp(firebaseConfig);

export default firebase;