import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text, Linking } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { auth, logout } from "../firebase";

export default function Settings({ navigation }) {
  const { currentUser, setCurrentUser } = useAuth();
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

  const handleLogout = async () => {
    try {
      logout();
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const whoop = async () => {
    console.log("whoop");
    // const res = await axios.get("http://192.168.170.179:5000/whoop/auth");
    // Linking.openURL("https://gdp-api.herokuapp.com/whoop/auth");
    Linking.openURL(
      "http://192.168.170.179:5000/whoop/auth?memberId=" + currentUser.uid
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button mode="contained" onPress={handleMyProfilePress}>
        My Profile
      </Button>
      <Button mode="contained" onPress={handleManageUsersPress}>
        Manage Users
      </Button>
      <Button mode="contained" onPress={whoop}>
        Whoop
      </Button>
      <Button title="Sign out" mode="contained" onPress={() => handleLogout()}>
        Sign out
      </Button>
    </View>
  );
}
