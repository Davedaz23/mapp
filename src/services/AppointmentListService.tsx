import { firestore } from '../config/firebase'; // Import firestore from your Firebase configuration
import { Appointment } from '../utils/types';
import { collection, getDocs } from 'firebase/firestore'; // Import required functions from Firestore

export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    // Access the 'appointments' collection
    const appointmentsCollection = collection(firestore, 'appointments');

    // Get the documents from the collection
    const snapshot = await getDocs(appointmentsCollection);

    // Map the data to a suitable format and return
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Appointment[];
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return []; // Return an empty array in case of an error
  }
};
