import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text, Divider, List, Headline, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { yourIp } from "../firebase";
import { Shadow } from "react-native-shadow-2";

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
    const response = await fetch(yourIp + "/exercises");
    const data = await response.json();
    setExercises(data);
  }

  const filteredList = exercises.filter((item) =>
    item.name.toLowerCase().includes(keywords.toLowerCase())
  );

  return (
    <View
      className="py-8 shadow sm:rounded-lg sm:px-10"
      style={{ backgroundColor: "#111", flex: 1 }}
    >
      {/* <Headline style={{ textAlign: "center",marginBottom:0,color:'white' }}>Exercises List</Headline> */}
      <View
        className="flex flex-row mt-5"
        style={{
          width: "90%",
          marginLeft: "5%",
          marginBottom: 30,
          backgroundColor: "#111",
        }}
      >
        <TextInput
          label="Exercise Name"
          value={keywords}
          placeholder="Search Exercises"
          placeholderTextColor={"white"}
          style={{
            backgroundColor: "rgb(47,47,47)",
            color: "white",
          }}
          onChangeText={handleSearch}
          className="block flex-grow appearance-none rounded-md  px-3 py-2 placeholder-gray-400 shadow-sm  focus:outline-none  sm:text-sm"
        />
      </View>
      <ScrollView style={{ backgroundColor: "rgb(47,47,47)" }}>
        {filteredList.map((exercise, index) => {
          return (
            <View
              key={index}
              style={{
                width: "100%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Shadow
                containerStyle={{ width: "90%" }}
                startColor="#11111180"
                style={{ width: "100%", height: "100%" }}
                offset={[0, 15]}
                distance={15}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Instruction", { exercise: exercise });
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "#111",
                      paddingLeft: 32,
                      height: "100%",
                      textAlignVertical: "center",
                      fontSize: 16,
                    }}
                  >
                    {exercise.name}
                  </Text>
                  {/* <List.Item
                  title={exercise.name}
                  titleStyle={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                  // descriptionStyle={{ color: "white" }}
                  style={{
                    backgroundColor: "#111",
                    paddingLeft: 10,
                  }}
                  description={exercise.desc}
                  // left={(props) => (
                  //   <List.Icon
                  //     color="orange"
                  //     icon="triangle"
                  //     style={{ transform: [{ rotate: "90deg" }] }}
                  //   />
                  // )}
                /> */}
                </TouchableOpacity>
              </Shadow>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
