
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDr6Q2hgFET1Yfs-QVp2qGhsdBnJnFP_Uc",
    authDomain: "",
    databaseURL: "https://menooz-bbd65-default-rtdb.firebaseio.com/",
    projectId: "menooz-bbd65",
    storageBucket: "menooz-bbd65.appspot.com",
    messagingSenderId: "",
    appId: "1:768267928350:android:bd4bf2352be310934cff0f"
  };

const app = initializeApp(firebaseConfig);

export default app;
