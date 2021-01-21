import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

require('dotenv').config()


ReactDOM.render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
