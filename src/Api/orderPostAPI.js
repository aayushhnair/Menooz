// import { getDatabase, ref, set } from 'firebase/database';

// // Function to post order data under a specific restaurant ID
// const postOrderData = (restaurantID, orderData,customerNumber) => {
//   const db = getDatabase();
//   const restaurantRef = ref(db, `/Restaurants/${restaurantID}/OrderData`);
//   dataModal = {
//     [customerNumber]: {
//       'OrderID': customerNumber,
//       'OrderStatus' : true,
//       'OrderDeliverd' : false,
//       'OrderInfo': orderData,
//     }
//   };
//   // Set the order data under the OrderData attribute for the specified restaurant ID
//   set(restaurantRef, dataModal)
//     .then(() => {
//       console.log('Order data posted successfully.');
//     })
//     .catch((error) => {
//       console.error('Error posting order data:', error);
//     });
// };

// export default postOrderData;


import { getDatabase, ref, push } from 'firebase/database';

// Function to post order data under a specific restaurant ID
const postOrderData = (restaurantID, orderData, customerNumber) => {
  // Get a reference to the Firebase database
  const db = getDatabase();

  // Construct the reference to the location where the order data will be stored
  const restaurantRef = ref(db, `/Restaurants/${restaurantID}/OrderData`);

  // Construct the data to be posted
  const dataModal = {
    'OrderID': customerNumber,
    'OrderStatus': true,
    'OrderDelivered': false,
    'OrderInfo': orderData,
  };

  // Push the order data under the OrderData attribute for the specified restaurant ID
  push(restaurantRef, dataModal)
    .then((newRef) => {
      console.log('Order data posted successfully with key:', newRef.key);
    })
    .catch((error) => {
      console.error('Error posting order data:', error);
    });
};

export default postOrderData;
