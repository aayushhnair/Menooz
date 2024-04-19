import { getDatabase, ref, push, set, onValue } from '@firebase/database';
import app from './firebaseconfig';

const db = getDatabase();
// Function to post order data under a specific restaurant ID
const postCustomerData = (user, name) => {
    // Get a reference to the Firebase database


    // Construct the reference to the location where the order data will be stored
    const customerRef = ref(db, `customers/${user.uid}/`);

    // Construct the data to be posted
    const UserModal = {
        address: {
            city: '',
            country: '',
            postalCode: '',
            state: '',
            street: '',
        },
        customerId: user.uid,
        email: user.email,
        name: name,
        phoneNumber: '',
    };

    // Push the order data under the OrderData attribute for the specified restaurant ID
    set(customerRef, UserModal)
        .then(() => {
            console.log('Customer data posted successfully for uid:', user.uid, customerRef);
        })
        .catch((error) => {
            console.log('Error posting customer data:', error);
        });
};

const editCustomerData = (uid, fieldToUpdate, newValue) => {
    try {
        // Get a reference to the Firebase database
        const db = getDatabase();

        // Define the path based on the field to update
        let path;
        switch (fieldToUpdate) {
            case 'name':
                path = `customers/${uid}/name`;
                break;
            case 'phoneNumber':
                path = `customers/${uid}/phoneNumber`;
                break;
            case 'gender':
                path = `customers/${uid}/gender`;
                break;
            default:
                console.error('Invalid field to update');
                return;
        }

        // Construct the reference to the specific field
        const fieldRef = ref(db, path);

        // Update the specific field with the new value
        set(fieldRef, newValue)
            .then(() => {
                console.log(`Updated ${fieldToUpdate} successfully for uid: ${uid}`);
            })
            .catch((error) => {
                console.log(`Error updating ${fieldToUpdate}:`, error);
            });

    } catch (error) {
        console.log('Error editing customer data:', error);
    }
};


const fetchOrderData = (uid, callback) => {
    try {
        const reference = ref(db, `/customers/${uid}/OrderData`);
  
        onValue(reference, (snapshot) => {
            const data = snapshot.val();

            // Check if data exists
            if (data) {
                const orders = Object.values(data); // Extract values from the data object
                callback(orders); // Return order details array
            } else {
                callback([]); // Return empty array if no data exists
            }
        });
    } catch (error) {
        console.error('Error fetching order data:', error);
        callback([]); // Return empty array in case of error
    }
};

export default postCustomerData;
export { fetchOrderData, editCustomerData };
