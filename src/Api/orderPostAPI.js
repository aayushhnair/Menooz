import { getDatabase, ref, push } from '@firebase/database';

// Function to post order data under a specific restaurant ID and customer
const postOrderData = (restaurantID, orderData, customerUID, customerEmail, restaurantName, paymentType) => {
  // Get a reference to the Firebase database
  console.log("\n\nRestaurant Id: ", orderData)
  const db = getDatabase();

  // Construct the reference to the location where the order data will be stored
  const restaurantRef = ref(db, `/Restaurants/${restaurantID}/OrderData`);
  const customerRef = ref(db, `/customers/${customerUID}/OrderData`);
  const now = new Date().toISOString();
  const dataModal = {
    "restaurantName" : restaurantName,
    'OrderID': customerUID,
    'OrderMail': customerEmail,
    'OrderStatus': true,
    "OrderTime": now,
    'OrderDelivered': false,
    'OrderInfo': orderData,
    'PaymentMethod': paymentType,
  };

  // Push the order data under the OrderData attribute for the specified restaurant ID
  push(restaurantRef, dataModal)
    .then((newRef) => {
      console.log('\n(FIREBASE) Order data posted successfully with key:', newRef.key);
    })
    .catch((error) => {
      console.log('(FIREBASE) Error posting order data:', error);
    });

  push(customerRef, dataModal)
    .then((newRef) => {
      console.log('\n(CUSTOMER) Order data posted successfully with key:', newRef.key);
    })
    .catch((error) => {
      console.log('(CUSTOMER) Error posting order data:', error);
    });
};

export default postOrderData;
