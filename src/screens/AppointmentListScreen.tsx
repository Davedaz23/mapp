import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { getAppointments } from '../services/AppointmentListService';
import { Appointment } from '../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppointmentsListScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const tableHead = ['Doctor', 'Patient', 'Date', 'Time', 'Status', 'Actions'];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleApprove = (id: string) => {
    console.log('Approving appointment:', id);
    // Add API call or logic here
  };

  const handleDetail = (appt: Appointment) => {
    setSelectedAppointment(appt);
    setModalVisible(true);
  };

  const handleExtend = (id: string) => {
    console.log('Extending appointment:', id);
    // Add API call or logic here
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Appointments List</Text>

      {/* Apply Button with Icon */}
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => navigation.navigate('Appointment')}
      >
        <Icon name="plus" size={20} color="white" />
        <Text style={styles.buttonText}> Apply for Appointment</Text>
      </TouchableOpacity>

      {/* Add horizontal scroll to the Table */}
      <ScrollView horizontal>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc', marginTop: 10 }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
          {appointments.map((appt) => (
            <Row
              key={appt.id} // Use a unique identifier (appointment id)
              data={[
                appt.doctorId,
                appt.patientId,
                new Date(appt.date).toLocaleDateString(),
                new Date(appt.time).toLocaleTimeString(),
                appt.status,
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#28A745' }]} // Green for approve
                    onPress={() => handleApprove(appt.id)}
                  >
                    <Icon name="check" size={16} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#007AFF' }]} // Blue for details
                    onPress={() => handleDetail(appt)}
                  >
                    <Icon name="eye" size={16} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#FFC107' }]} // Yellow for extend
                    onPress={() => handleExtend(appt.id)}
                  >
                    <Icon name="clock-o" size={16} color="white" />
                  </TouchableOpacity>
                </View>,
              ]}
              textStyle={styles.rowText}
            />
          ))}
        </Table>
      </ScrollView>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Appointment Details</Text>
              <Text>Doctor: {selectedAppointment.doctorId}</Text>
              <Text>Patient: {selectedAppointment.patientId}</Text>
              <Text>Date: {new Date(selectedAppointment.date).toLocaleDateString()}</Text>
              <Text>Time: {new Date(selectedAppointment.time).toLocaleTimeString()}</Text>
              <Text>Status: {selectedAppointment.status}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  head: {
    height: 40,
    backgroundColor: '#007AFF',
  },
  headText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  rowText: {
    textAlign: 'center',
    padding: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    padding: 6,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default AppointmentsListScreen;
