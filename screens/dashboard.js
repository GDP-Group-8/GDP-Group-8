import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Linking } from "react-native";
import { Button } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { Agenda } from "react-native-calendars";
import { auth, logout } from "../firebase";
import React from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
export default function Dashboard({ navigation }) {
  //this is a listener that will check if the user is logged in or not
  const { admin, currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
  }, [currentUser, navigation]);

  const handleLogout = async () => {
    try {
      logout();
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Text>Welcome to dashboard</Text>
      <Button
        title="Sign out"
        mode="contained"
        onPress={() => handleLogout()}
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Sign out
      </Button>
      {/* <Button
        title="Whoop"
        mode="contained"
        onPress={() =>
          Linking.openURL("http://192.168.170.179:5000/whoop/auth")
        }
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Whoop
      </Button> */}
      {admin && (
        <Button
          title="User management screen"
          mode="contained"
          onPress={() => navigation.navigate("UsersManage")}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          User management screen
        </Button>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
