import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyB_a30J9zpcHyptpgUvn8tOm8_HXq8-Fqg",
    authDomain: "movie-notification-70b9d.firebaseapp.com",
    projectId: "movie-notification-70b9d",
    storageBucket: "movie-notification-70b9d.appspot.com",
    messagingSenderId: "376213081298",
    appId: "1:376213081298:web:b6cc14a9c697151bbdb10b",
    measurementId: "G-9R2WFVJCL5",
    databaseURL: "https://movie-notification-70b9d-default-rtdb.firebaseio.com",
}

firebase.initializeApp(config)
export default firebase;