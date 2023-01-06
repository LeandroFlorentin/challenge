import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAXMnh1ZxqOlO4B7DcbkTIruUjqJYK3BUM",
    authDomain: "challengue-a5e40.firebaseapp.com",
    projectId: "challengue-a5e40",
    storageBucket: "challengue-a5e40.appspot.com",
    messagingSenderId: "156485839077",
    appId: "1:156485839077:web:77f7fb053f68a2b4ffcc0c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;