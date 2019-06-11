import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import './styles/css/App.css';
import Layout from './app/Layout';

import withAuthentication from './app/withAuthentication.js';

//import withFirebaseAuth from "react-with-firebase-auth";
//import * as firebase from 'firebase';
//import FirebaseKeys from './firebase'

//const firebaseApp = firebase.initializeApp(FirebaseKeys);

//const firebaseAppAuth = firebaseApp.auth();

//const providers = {
    //googleProvider:new firebase.auth.GoogleAuthProvider(),   
//};

class App extends Component {
    //state = {authenticated: false, user: null};
    render(){
      //const {authenticated} = this.state;  
    
    return (
      <Layout />
    );
    }
}
/*
  componentWillMount() {
  firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      this.setState({
        authenticated: true,
        currentUser: user
      });
    } else {
      this.setState({
        authenticated: false,
        currentUser: null
      });
    }
  });
}
}
*/

export default App;
