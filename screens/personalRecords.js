import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { Text, Divider, List, Headline, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
export default function PersonalRecords({ navigation }) {
  

  const { currentUser, admin } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
    fetchExercises();
  }, [currentUser]);


  return (
    <View className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <Headline style={{ textAlign: "center" }}>My Lifts</Headline>
      <View className="flex flex-row mt-5">

      </View>
    </View>
  );
}
