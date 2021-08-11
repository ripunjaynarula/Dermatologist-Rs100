import firebase from 'firebase/app';
import "firebase/auth"

var app;
if (process.env.REACT_APP_USE_ENV) {
    app = firebase.initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_API,
        authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_FIREBASE_API_ID
    })
} else {
    app = firebase.initializeApp({
        apiKey: "AIzaSyCKs8TgGuvwMec2ebnz6-zhYZUVsimkjpg",
        authDomain: "mediac-fda09.firebaseapp.com",
        projectId: "mediac-fda09",
        storageBucket: "mediac-fda09.appspot.com",
        messagingSenderId: "1068406252700",
        appId: "1:1068406252700:web:a8abd468964d35cce97959"
    })
}


export const auth = app.auth()
export default app