import firebase from 'firebase';


var firebaseConfig = {
  apiKey: '************************',
  authDomain: '*********************',
  databaseURL: '*******************',
  projectId: '*******************',
  storageBucket: '*********************',
  messagingSenderId: '*****************',
  appId: '*************************',
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;