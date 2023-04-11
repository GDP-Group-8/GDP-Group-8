import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text, Linking, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../firebase";
import { yourIp } from "../firebase";
export default function Settings({ navigation }) {
  const { currentUser, setCurrentUser } = useAuth();
  useEffect(() => {
    if (!currentUser && navigation) {
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
    // const res = await axios.get(yourIp+"/whoop/auth");
    // Linking.openURL("https://gdp-api.herokuapp.com/whoop/auth");
    Linking.openURL(yourIp + "/whoop/auth?memberId=" + currentUser.uid);
  };

  const googleFit = async () => {
    console.log("Google Fit");
    // const res = await axios.get(yourIp+"/whoop/auth");
    // Linking.openURL("https://gdp-api.herokuapp.com/whoop/auth");
    Linking.openURL(yourIp + "/googlefit/auth?memberId=" + currentUser.uid);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <View style={{ margin: 20, flex: 1, justifyContent: "center" }}>
        <Button
          mode="contained"
          onPress={handleMyProfilePress}
          style={styles.button}
          labelStyle={{ color: "white" }}
          contentStyle={{ paddingVertical: 5 }}
        >
          My Profile
        </Button>
        <Button
          mode="contained"
          onPress={handleManageUsersPress}
          style={styles.button}
          labelStyle={{ color: "white" }}
          contentStyle={{ paddingVertical: 5 }}
        >
          Manage Users
        </Button>
        <Button
          mode="contained"
          onPress={whoop}
          style={styles.button}
          labelStyle={{ color: "white" }}
          contentStyle={{ paddingVertical: 5 }}
        >
          Connect to Whoop
        </Button>
        <Button
          mode="contained"
          onPress={googleFit}
          style={styles.button}
          labelStyle={{ color: "white" }}
          contentStyle={{ paddingVertical: 5 }}
        >
          Connect to Google Fit
        </Button>

        <Button
          mode="contained"
          onPress={() => handleLogout()}
          labelStyle={{ color: "white" }}
          style={{ ...styles.button, marginBottom: 0 }}
          contentStyle={{ paddingVertical: 5 }}
        >
          Sign out
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2e2e2e",
    borderRadius: 5,
    marginBottom: 20,
  },
});
