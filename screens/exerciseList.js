import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { Text, Divider, List, Headline, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { yourIp } from "../firebase";
export default function ExerciseList({ navigation }) {
 
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
    const response = await fetch(yourIp + "/exercises");
    const data = await response.json();
    setExercises(data);
  }

  const filteredList = exercises.filter((item) =>
    item.name.toLowerCase().includes(keywords.toLowerCase())
  );
  return (
    <View
      className=" py-8 shadow sm:rounded-lg sm:px-10"
      style={{ backgroundColor: "rgb(31,31,31)" }}
    >
      {/* <Headline style={{ textAlign: "center",marginBottom:0,color:'white' }}>Exercises List</Headline> */}
      <View
        className="flex flex-row mt-5"
        style={{ width: "80%", marginLeft: "10%", marginBottom: 30 }}
      >
        <TextInput
          label="Exercise Name"
          value={keywords}
          placeholder="Search Exercises"
          placeholderTextColor={"white"}
          style={{
            backgroundColor: "rgb(47,47,47)",
            border: "1px solid white",
            color: "white",
          }}
          onChangeText={handleSearch}
          className="block flex-grow appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm  focus:outline-none  sm:text-sm"
        />
      </View>
      <View className="mb-5">
        <Button
            icon="plus"
            mode="contained"
            buttonColor="orange"
            style={{
                color: "orange",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={() => {
                navigation.push("AddExercise");
            }}
        >
            Add Exercise
        </Button>
      </View>
      <ScrollView
        style={{ backgroundColor: "rgb(47,47,47)", marginBottom: 60 }}
      >
        {filteredList.map((exercise, index) => {
          return (
            <View key={index}>
              <View style={{ minHeight: 60 }}>
                <List.Item
                  title={exercise.name}
                  titleStyle={{
                    color: "white",
                    marginBottom: 5,
                    fontWeight: "bold",
                  }}
                  descriptionStyle={{ color: "white" }}
                  style={{
                    backgroundColor: "rgb(47,47,47)",
                    borderTopWidth: 1,
                    borderTopColor: "white",
                    paddingLeft: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("Instruction", { exercise: exercise });
                  }}
                  description={exercise.desc}
                  left={(props) => (
                    <List.Icon
                      color="orange"
                      icon="triangle"
                      style={{ transform: [{ rotate: "90deg" }] }}
                    />
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
