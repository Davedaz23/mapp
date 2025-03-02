import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { createAppointment } from '../services/appointmentService';
import { Appointment } from '../utils/types';
import { getUsersByRole } from '../services/UserService'; 
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';  // Import the select dropdown

const AppointmentScreen = () => {
  const [doctorId, setDoctorId] = useState<string>(''); // Doctor selection
  const [patientId, setPatientId] = useState<string>(''); 
  const [reason, setReason] = useState<string>(''); 
  const [notes, setNotes] = useState<string>(''); 
  const [date, setDate] = useState<Date>(new Date()); 
  const [time, setTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'completed' | 'canceled'>('pending');
  const [loading, setLoading] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<any[]>([]); // List of doctors
  const [userRole, setUserRole] = useState<string>(''); // User role

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        setPatientId(currentUser.uid);

        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
        const role = userDoc.data()?.role; // Assuming the role is stored in the user's document
        setUserRole(role);

        const doctorListSnapshot = await firestore()
          .collection('users')
          .where('role', '==', 'doctor') 
          .get();

        const doctorList = doctorListSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name, 
        }));

        if (role === 'doctor') {
          doctorList.push({
            id: currentUser.uid,
            name: userDoc.data()?.name || 'Your Name', 
          });
        }

        setDoctors(doctorList);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateAppointment = async () => {
    setLoading(true);
    const appointment: Appointment = {
      id: '',
      patientId,
      doctorId,
      reason,
      notes,
      date: date.toISOString(),
      time: time.toISOString(),
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const docRef = await createAppointment(appointment);
      setLoading(false);
      if (docRef) {
        Toast.show({
          type: 'success',
          text1: 'Appointment Created',
          text2: `Your appointment has been successfully scheduled.`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to create appointment. Please try again.',
        });
      }
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while creating the appointment.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Patient ID"
        value={patientId}
        editable={false} 
      />
      <Text style={styles.label}>Select Doctor</Text>
      {doctors.length === 0 ? (
        <Text>No doctors found</Text>
      ) : (
        <SelectDropdown
            data={doctors.map((doctor) => doctor.name)} // Passing the list of doctor names
            onSelect={(selectedItem, index) => setDoctorId(doctors[index].id)} // Getting the selected doctor's ID
            dropdownStyle={styles.dropdown} // Apply the styles as needed
            renderButton={function (selectedItem: any, isOpened: boolean): React.ReactNode {
              throw new Error('Function not implemented.');
            } } renderItem={function (selectedItem: any, index: number, isSelected: boolean): React.ReactNode {
              throw new Error('Function not implemented.');
            } }        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Reason for Appointment"
        value={reason}
        onChangeText={setReason}
      />
      <TextInput
        style={styles.input}
        placeholder="Additional Notes"
        value={notes}
        onChangeText={setNotes}
      />

      <Text style={styles.label}>Selected Date: {date.toLocaleDateString()}</Text>
      <Button title="Select Appointment Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Selected Time: {time.toLocaleTimeString()}</Text>
      <Button title="Select Appointment Time" onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      <Button title={loading ? 'Creating appointment...' : 'Create Appointment'} onPress={handleCreateAppointment} />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
  },
  dropdownRow: {
    backgroundColor: '#fff',
  },
});

export default AppointmentScreen;
