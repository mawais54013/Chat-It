import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyBx9tc3BqVEsNQDdFkRIrrtthpNShiEDTY",
    authDomain: "chat-example-b1fe3.firebaseapp.com",
    databaseURL: "https://chat-example-b1fe3.firebaseio.com",
    projectId: "chat-example-b1fe3",
    storageBucket: "chat-example-b1fe3.appspot.com",
    messagingSenderId: "1001884629655"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
