import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/vendors/iconic-fonts/font-awesome/css/all.min.css';
import './assets/vendors/iconic-fonts/flat-icons/flaticon.css';
import './assets/vendors/iconic-fonts/cryptocoins/cryptocoins.css';
import './assets/vendors/iconic-fonts/cryptocoins/cryptocoins-colors.css';
import './assets/css/animate.min.css';
import './assets/css/style.css';
import axios from "axios";


axios.defaults.baseURL = 'https://exam360logistics.herokuapp.com/post-tracking-portal/api/v1/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <BrowserRouter basename={''}>
    <App />
  </BrowserRouter>,
  document.getElementById('costic')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
