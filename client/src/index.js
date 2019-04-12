import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyATqbuKr2hAJEaTfiUgRYU_h3Y94hcEWuM",
    authDomain: "real-time-code.firebaseapp.com",
    databaseURL: "https://real-time-code.firebaseio.com",
    projectId: "real-time-code",
    storageBucket: "real-time-code.appspot.com",
    messagingSenderId: "1053713131883"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
