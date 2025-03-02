export type Appointment = {
    id: string; // Unique identifier for the appointment
    patientId: string; // Name of the patient
    doctorId: string; // Name of the doctor
    date: string; // Appointment date (ISO string format)
    reason: string; // Appointment date (ISO string format)
    notes: string; // Appointment date (ISO string format)
    time: string; // Appointment time (ISO string format)
    status: 'pending' | 'confirmed' | 'completed' | 'canceled'; // Include 'confirmed'
    createdAt: string; // Date and time when the appointment was created
    updatedAt: string; // Date and time when the appointment was last updated
  };
  export type User = {
    id: string; // Unique identifier for the user
    name: string; // Full name of the user
    email: string; // Email address of the user
    role: 'patient' | 'doctor'; // Role of the user (patient or doctor)
    profilePicture: string; // URL to the user's profile picture (optional)
    phone: string; // Phone number of the user (optional)
    createdAt: string; // Date and time when the user was created
    status: 'active' | 'inActive' | 'suspended'; // Status of the user (active, inactive, suspended)
  };
  
  export type LoadingState = {
    isLoading: boolean;
    error: string | null;
  };
  
  export type ApiResponse<T> = {
    data: T;
    success: boolean;
    error: string | null;
  };
  export type CreateAppointmentFormData = {
    patientName: string;
    doctorName: string;
    date: string; // Date in ISO string format
    time: string; // Time in ISO string format
  };
  
  export const initialFormValues: CreateAppointmentFormData = {
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
  };
    