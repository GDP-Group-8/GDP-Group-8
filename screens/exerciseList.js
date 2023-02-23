import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Divider, List, Headline, Button } from "react-native-paper";
export default function ExerciseList({ navigation }) {
  const [exercises, setExercises] = React.useState([
    {
      name: "Yoga",
      desc: "Relax the body and mind, relieve the mood",
    },
    {
      name: "Sit-ups",
      desc: "High intensity fat burning and muscle strengthening",
    },
    {
      name: "Jogging",
      desc: "Improve body endurance",
    },
    {
      name: "Yoga",
      desc: "Relax the body and mind, relieve the mood",
    },
    {
      name: "Sit-ups",
      desc: "High intensity fat burning and muscle strengthening",
    },
    {
      name: "Jogging",
      desc: "Improve body endurance",
    },
    {
      name: "Yoga",
      desc: "Relax the body and mind, relieve the mood",
    },
    {
      name: "Sit-ups",
      desc: "High intensity fat burning and muscle strengthening",
    },
    {
      name: "Jogging",
      desc: "Improve body endurance",
    },
    {
      name: "Yoga",
      desc: "Relax the body and mind, relieve the mood",
    },
    {
      name: "Sit-ups",
      desc: "High intensity fat burning and muscle strengthening",
    },
    {
      name: "Jogging",
      desc: "Improve body endurance",
    },
    {
      name: "Yoga",
      desc: "Relax the body and mind, relieve the mood",
    },
    {
      name: "Sit-ups",
      desc: "High intensity fat burning and muscle strengthening",
    },
    {
      name: "Jogging",
      desc: "Improve body endurance",
    },
  ]);

  return (
    <View className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <Headline style={{ textAlign: "center" }}>Exercises List</Headline>
      <ScrollView>
        {exercises.map((exercise, index) => {
          return (
            <View key={index}>
              <View>
                <View className="mt-1">
                  <List.Item
                    title={exercise.name}
                    description={exercise.desc}
                    left={(props) => (
                      <List.Icon color="orange" icon="alpha-e-box" />
                    )}
                    onPress={() => console.log("Pressed")}
                  />
                </View>
                <Divider />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
