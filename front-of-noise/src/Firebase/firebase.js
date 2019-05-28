var firebase = require('firebase/app');
require ('firebase/auth');

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});


class Firebase {
    constructor(){
        firebase.initializeApp(config);
        
        this.auth = firebase.auth();
    }

    
    // ***Auth API ***
    // Define authentication functions as Firebase class methods to serve as communication channel from Firebase class to Firebase API
    
    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    doSignOut=()=> this.auth.signOut();

    doPasswordReset = email=>this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    
}

export default Firebase;

