import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { Text, Divider, List, Headline, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import {
  LineChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
export default function PersonalRecords({ navigation }) {
  
  const screenWidth = (Dimensions.get("window").width) - (Dimensions.get("window").width)/13;
  const { currentUser, admin } = useAuth();
  const [records, setRecords] = React.useState([]);
  const exercise = "Squat";

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
    fetchRecords();
  }, [currentUser]);

  const demoRecords = [

  ];

  async function fetchRecords(exercise) {
    const response = await fetch("https://gdp-api.herokuapp.com/records/" + exercise);
    const data = await response.json();
    setRecords(data);
  }

  return (
    <View className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <Headline style={{ textAlign: "center" }}>My Lifts</Headline>
      <View className="">
        <Text>Excercise</Text>
          <LineChart
            class="w-100 p-3"
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={screenWidth} // from react-native
            height={220}
            yAxisSuffix="kg"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
      </View>
    </View>
  );
}
