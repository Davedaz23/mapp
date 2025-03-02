import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Appointment } from '../utils/types';

export const createAppointment = async (appointment: Appointment): Promise<string | null> => {
  try {
    // Prepare appointment data
    const newAppointment = {
      ...appointment,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    // Store appointment details in Firestore
    const docRef = await firestore().collection('appointments').add(newAppointment);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error("Error creating appointment:", error);
    return null;
  }
};