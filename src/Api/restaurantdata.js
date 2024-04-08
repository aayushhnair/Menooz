import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
    // Replace with your actual Firebase project configuration
    apiKey: "AIzaSyDr6Q2hgFET1Yfs-QVp2qGhsdBnJnFP_Uc",
    authDomain: "",
    databaseURL: "https://menooz-bbd65-default-rtdb.firebaseio.com/",
    projectId: "menooz-bbd65",
    storageBucket: "menooz-bbd65.appspot.com",
    messagingSenderId: "",
    appId: "1:768267928350:android:bd4bf2352be310934cff0f"
  };

  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);
  const fetchRestaurantData = (callback) => {
    const reference = ref(db, '/Restaurants'); // Assuming all restaurants are stored under the 'Restaurants' node
    const unsubscribe = onValue(reference, (snapshot) => {
      const data = snapshot.val();
      const restaurants = data;
      callback(restaurants);
    });
  
    return () => unsubscribe(); // Return cleanup function to detach listener on unmount
  };
  
  export default fetchRestaurantData;