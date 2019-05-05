import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';


//Firebase imports
// import Firebase, {FirebaseContext} from './app/components/Firebase';



ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'));


serviceWorker.unregister();
