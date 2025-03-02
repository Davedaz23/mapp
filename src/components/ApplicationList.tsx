// import { Appointment } from "../utils/types"; // Import the Appointment type

// type AppointmentListProps = {
//   appointments: Appointment[]; // Array of appointments to display
//   onSelectAppointment: (appointmentId: string) => void; // Callback to handle appointment selection
// };

// const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onSelectAppointment }) => {
//   return (
//     <FlatList
//       data={appointments}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <TouchableOpacity onPress={() => onSelectAppointment(item.id)}>
//           <Text>{item.patientName}</Text>
//           <Text>{item.date}</Text>
//         </TouchableOpacity>
//       )}
//     />
//   );
// };
