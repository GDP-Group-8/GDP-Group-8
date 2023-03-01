import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { Text, Divider, List, Headline, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
export default function ExerciseList({ navigation }) {
  const exercisesOrigin = [
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
  ];
  const [keywords, setKeywords] = useState("");
  const { currentUser, admin } = useAuth();
  const [exercises, setExercises] = React.useState([]);
  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
    fetchExercises();
  }, [currentUser]);

  const handleSearch = (text) => {
    setKeywords(text);
  };

  async function fetchExercises() {
    const response = await fetch("https://gdp-api.herokuapp.com/exercises");
    const data = await response.json();
    setExercises(data);
  }

  const filteredList = exercises.filter((item) =>
    item.name.toLowerCase().includes(keywords.toLowerCase())
  );
  return (
    <View className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <Headline style={{ textAlign: "center" }}>Exercises List</Headline>
      <View className="flex flex-row mt-5">
        <TextInput
          label="Exercise Name"
          value={keywords}
          placeholder="Search exercises"
          onC
          onChangeText={handleSearch}
          className="block flex-grow appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </View>
      <ScrollView>
        {filteredList.map((exercise, index) => {
          return (
            <View key={index}>
              <View className="mt-1">
                <List.Item
                  title={exercise.name}
                  onPress={() => {
                    navigation.navigate("Instruction", { exercise: exercise });
                  }}
                  description={exercise.desc}
                  left={(props) => (
                    <List.Icon color="orange" icon="alpha-e-box" />
                  )}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
