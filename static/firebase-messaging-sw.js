// Learn more or give us feedback
/* global importScripts, firebase */
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "665999612795"
});

firebase.messaging();
