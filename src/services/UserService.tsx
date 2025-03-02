import { firestore } from '../config/firebase';  // Import your custom firestore instance
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import necessary functions

// Define the User interface
export type User = {
  id: string; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address of the user
  role: 'patient' | 'doctor'; // Role of the user (patient or doctor)
  status: 'active' | 'inActive'|'suspended'; // Role of the user (patient or doctor)
  profilePicture: string; // URL to the user's profile picture (optional)
  phone: string; // Phone number of the user (optional)
  createdAt: string; // Date and time when the user was created
};

// Function to fetch users by role
export const getUsersByRole = async (role: 'patient' | 'doctor'): Promise<User[]> => {
  try {
    // Get reference to 'users' collection
    const usersCollection = collection(firestore, 'users');
    
    // Create a query to filter users by the role
    const q = query(usersCollection, where('role', '==', role));

    // Execute the query
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('No users found with this role');
      return [];
    }

    // Map the snapshot data to the User interface with fallback values
    const users: User[] = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name || '',  // Fallback if name is missing
      email: doc.data().email || '',  // Ensure email is provided
      role: doc.data().role || 'patient',  // Default role if missing
      status: doc.data().status || 'inActive',  // Default role if missing
      profilePicture: doc.data().profilePicture || '',  // Default empty string if missing
      phone: doc.data().phone || '',  // Default empty string if missing
      createdAt: doc.data().createdAt || new Date().toISOString(),  // Fallback to current time if missing
    }));

    return users;
  } catch (error) {
    console.error('Error fetching users by role from Firebase:', error);
    throw error;
  }
};
