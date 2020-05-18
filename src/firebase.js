import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDPDn0v7d5HEc_XvYdQf8WuJROeab5Rbog",
    authDomain: "inventory-management-1b1b3.firebaseapp.com",
    databaseURL: "https://inventory-management-1b1b3.firebaseio.com",
    projectId: "inventory-management-1b1b3",
    storageBucket: "inventory-management-1b1b3.appspot.com",
    messagingSenderId: "884099847406",
    appId: "1:884099847406:web:824cfbf48ebef5082bcfff",
    measurementId: "G-5176DTDW15"
  
};
  
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();