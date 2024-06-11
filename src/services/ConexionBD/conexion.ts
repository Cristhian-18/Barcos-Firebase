import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB2CU3yuaThPs2nvctJiyAKUeu1C30VU9s",
    authDomain: "barcos-2f946.firebaseapp.com",
    projectId: "barcos-2f946",
    storageBucket: "barcos-2f946.appspot.com",
    messagingSenderId: "111963533303",
    appId: "1:111963533303:web:10f7c55ff4c2c83233c8f2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
