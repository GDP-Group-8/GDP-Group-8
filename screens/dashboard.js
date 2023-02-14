import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { Agenda } from "react-native-calendars";
import { auth, logout } from "../firebase";
import React from "react";

export default function Dashboard({ navigation }) {
  //this is a listener that will check if the user is logged in or not
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in");
    } else {
      navigation.navigate("Signin");
    }
  });

  return (
    <View className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Agenda></Agenda>
      <Text>Welcome to dashboard</Text>
      <Button
        title="Sign out"
        mode="contained"
        onPress={() => logout()}
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Sign out
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}
