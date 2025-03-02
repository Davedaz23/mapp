import { Button, Text, View } from "react-native";
import { User } from "../utils/types";

type UserProfileProps = {
  user: User; // The user to display in the profile
  onEditProfile: () => void; // Callback for editing the profile
};

const UserProfile: React.FC<UserProfileProps> = ({ user, onEditProfile }) => {
  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Role: {user.role}</Text>
      <Button title="Edit Profile" onPress={onEditProfile} />
    </View>
  );
};
