import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCKs8TgGuvwMec2ebnz6-zhYZUVsimkjpg",
    authDomain: "mediac-fda09.firebaseapp.com",
    projectId: "mediac-fda09",
    storageBucket: "mediac-fda09.appspot.com",
    messagingSenderId: "1068406252700",
    appId: "1:1068406252700:web:a8abd468964d35cce97959"
})

export const auth = app.auth()
export default app
