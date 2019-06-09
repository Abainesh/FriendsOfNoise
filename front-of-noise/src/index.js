import React from 'react';
import ReactDOM from 'react-dom';
import Client from './Client';
import './styles/css/index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';


// import Firebase, {FirebaseContext} from './Firebase';



ReactDOM.render((
  <Router>
    <Client />
  </Router>
), document.getElementById('root'));


serviceWorker.unregister();
