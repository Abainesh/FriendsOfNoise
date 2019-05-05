var firebase = require('firebase/app');
require ('firebase/auth');

  const config = {
    apiKey: "AIzaSyDbc4W4kEjyqFkqwdG8fkFiqStzTPiOVPA",
    authDomain: "friendsofnoise.firebaseapp.com",
    databaseURL: "https://friendsofnoise.firebaseio.com",
    projectId: "friendsofnoise",
    storageBucket: "friendsofnoise.appspot.com",
    messagingSenderId: "771386493067",
    appId: "1:771386493067:web:0c92ef05a443a7c9"
  };

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

