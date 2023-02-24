import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export default function Settings({ navigation }) {
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
  }, [currentUser, navigation]);
  const handleMyProfilePress = () => {
    // navigate to MyProfile screen
    navigation.navigate("MyProfile");
  };

  const handleManageUsersPress = () => {
    // navigate to ManageUsers screen
    navigation.navigate("UsersManage");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button mode="contained" onPress={handleMyProfilePress}>
        My Profile
      </Button>
      <Button mode="contained" onPress={handleManageUsersPress}>
        Manage Users
      </Button>
    </View>
  );
}
