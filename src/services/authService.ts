import { auth, firestore } from '../config/firebase';
import { ConfirmationResult, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User } from '../utils/types';
import axios from 'axios';

/**
 * Sign up a new user and store their details in Firestore.
 * @param email - The user's email address.
 * @param password - The user's chosen password.
 * @param userInfo - Additional user information excluding 'id' and 'createdAt'.
 * @returns A promise that resolves to the UserCredential or null in case of error.
 */
export const signUp = async (
  email: string,
  password: string,
  userInfo: Omit<User, 'id' | 'createdAt'>
): Promise<UserCredential | null> => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Prepare user data
    const newUser: User = {
      id: uid,
      ...userInfo,
      createdAt: new Date().toISOString(),
    };

    // Store user data in Firestore
    await setDoc(doc(firestore, 'users', uid), newUser);

    // Send OTP after user is created
    // const otpSent = await sendOtp(userInfo.phone); // Await the OTP sending function

    // if (!otpSent) {
    //   console.error('Failed to send OTP');
    //   return null;
    // }

    // console.log('OTP sent successfully');

    return userCredential;
  } catch (error) {
    console.error('SignUp Error:', error);
    return null;
  }
};


/**
 * Log in an existing user.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to the User object or null in case of error.
 */
export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Retrieve user data from Firestore
    const userDoc = await getDoc(doc(firestore, 'users', uid));

    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      console.error('User data not found in Firestore.');
      return null;
    }
  } catch (error) {
    console.error('Login Error:', error);
    return null;
  }
};

/**
 * Sends OTP using Firebase Function
 * @param phoneNumber - The phone number to send OTP to.
 */
const API_URL = 'http://localhost:5000/api'; // e.g., 'http://localhost:5000/api'
interface SendOtpResponse {
  success: boolean;
  otp?: number;
  message?: string;
}
// Export the sendOtp function
export const sendOtp = async (phone: string): Promise<number | null> => {
  try {
    const response = await axios.post<SendOtpResponse>('http://192.168.55.243:5000/api/send-otp', { phone }, {
      timeout: 60000,  // Set timeout to 10 seconds (10000ms)
    });

    if (response.data.success && response.data.otp) {
      return response.data.otp; // OTP generated and returned from backend
    } else {
      throw new Error(response.data.message || 'Failed to send OTP');
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

/**
 * Verifies the OTP entered by the user.
 * @param confirmationResult - The confirmation result from sendOtp.
 * @param otp - The OTP entered by the user.
 * @returns A promise that resolves to the authenticated user or null on failure.
 */
export const verifyOtp = async (confirmationResult: any, otp: string) => {
  try {
    const userCredential = await confirmationResult.confirm(otp);
    return userCredential.user; // Returns the user after successful OTP verification
  } catch (error) {
    console.error('OTP Verification Failed:', error);
    throw new Error('Invalid OTP. Please try again.');
  }
};
