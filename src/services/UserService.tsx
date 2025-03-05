import { firestore, auth } from '../config/firebase'; // Import your custom firestore instance and auth instance
//import { collection, doc, getDoc, setDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'; // Import necessary functions
import { collection, doc, getDoc, setDoc, serverTimestamp, query, where, getDocs } from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging'; // Import messaging

export type User = {
  id: string; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address of the user
  role: 'patient' | 'doctor'; // Role of the user (patient or doctor)
  status: 'active' | 'inActive' | 'suspended'; // Status of the user (active, inActive, suspended)
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
      name: doc.data().name || '', // Fallback if name is missing
      email: doc.data().email || '', // Ensure email is provided
      role: doc.data().role || 'patient', // Default role if missing
      status: doc.data().status || 'inActive', // Default status if missing
      profilePicture: doc.data().profilePicture || '', // Default empty string if missing
      phone: doc.data().phone || '', // Default empty string if missing
      createdAt: doc.data().createdAt || new Date().toISOString(), // Fallback to current time if missing
    }));

    return users;
  } catch (error) {
    console.error('Error fetching users by role from Firebase:', error);
    throw error;
  }
};

// Function to handle login
export const handleLogin = async (
  phoneNumber: string,
  navigation: any, // Type as per your navigation setup
  setError: (message: string) => void,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  setError('');

  try {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber}`;

    // Ensure firestore is correctly initialized
    if (!firestore) {
      throw new Error('Firestore is not properly initialized');
    }

    // Check if phone number already exists in Firestore
    const phoneDocRef = doc(firestore, 'phoneotps', formattedPhone);
    const phoneDocSnap = await getDoc(phoneDocRef);

    const currentTime = new Date();

    if (phoneDocSnap.exists) {
      const data = phoneDocSnap.data();
      const expireTime = data?.expireTime.toDate(); // Convert Firestore timestamp

      if (data?.status === 'pending' && expireTime > currentTime) {
        // If OTP is still valid, navigate to OTP screen
        navigation.navigate('OtpVerification', { phone: formattedPhone, confirmation: null });
        return;
      }
    }

    // Generate OTP using the external API or service
    const otp = generateOtp();  // Generate OTP

    // Store OTP request in Firestore
    await setDoc(phoneDocRef, {
      otp: otp, // Store the OTP
      expireTime: new Date(currentTime.getTime() + 5 * 60 * 1000), // Expires in 5 minutes
      status: 'pending',
      createdAt: serverTimestamp(),
    });

    // Get the FCM token for the user's device
    const fcmToken = await getFCMToken();
    
    if (fcmToken) {
      // Send the OTP to the user's device via push notification
      await messaging().sendMessage({
        to: fcmToken,
        notification: {
          title: 'Your OTP Code',
          body: `Your OTP code is: ${otp}`,
        },
        data: {
          otp: otp.toString(),
        },
        fcmOptions: {}
      });

      console.log('Push notification sent with OTP');
    }

    // Navigate to OTP verification screen
    navigation.navigate('OtpVerification', { phone: formattedPhone, confirmation: null });

  } catch (error: any) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

/**
 * Generates a random 6-digit OTP.
 * @returns A 6-digit OTP number.
 */
export const generateOtp = (): number => {
  // Generate a random number between 100000 and 999999 (6-digit number)
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log("FCM Token: ", token);
      return token;
    }
  } catch (error) {
    console.error("Error getting FCM token: ", error);
  }
};
