import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bulma/css/bulma.min.css';

import firebase from 'firebase/app'
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBWGP6VYh9rz2GWt9AVsiUKXLlF8gj3lJU",
  authDomain: "quiz-leaderboard-75c33.firebaseapp.com",
  databaseURL: "https://quiz-leaderboard-75c33-default-rtdb.firebaseio.com",
  projectId: "quiz-leaderboard-75c33",
  storageBucket: "quiz-leaderboard-75c33.appspot.com",
  messagingSenderId: "1033233354313",
  appId: "1:1033233354313:web:5f88a65cfb683e06a1b998"
}


firebase.initializeApp(firebaseConfig);

//console.log(db)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
