
import { getDatabase, ref, onValue } from '@firebase/database';
import app from './firebaseconfig';
  const db = getDatabase(app);
  const fetchRestaurantData = (userLatitude, userLongitude, maxDistance, callback) => {
    const reference = ref(db, '/Restaurants');
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        const filteredRestaurants = {};

        if (data) {
            Object.keys(data).forEach((key) => {
                const restaurant = data[key];
                const distance = calculateDistance(userLatitude, userLongitude, restaurant.location.latitude, restaurant.location.longitude);
                if (distance <= maxDistance) {
                    filteredRestaurants[key] = { ...restaurant, distance }; // Add restaurant to filteredRestaurants object
                }
            });
        }
        
        callback(filteredRestaurants); // Return filtered restaurants as an object
    });
};


  const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d;
  };
  
  const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
  };
  
  export default fetchRestaurantData;