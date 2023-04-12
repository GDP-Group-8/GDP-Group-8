import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { yourIp } from "../firebase";
import { Shadow } from "react-native-shadow-2";

export default function ExerciseList({ navigation }) {
  const [keywords, setKeywords] = useState("");
  const { currentUser, admin } = useAuth();
  const [exercises, setExercises] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
    fetchExercises();
  }, [currentUser]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchExercises();

    setRefreshing(false);
  }, []);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(31,31,31)" }}>
      <View
        style={{
          flex: 1,
          paddingBottom: 80,
          backgroundColor: "rgb(31,31,31)",
        }}
      >
        <View
          className=" py-8 shadow sm:rounded-lg sm:px-10"
          style={{ backgroundColor: "rgb(31,31,31)" }}
        >
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
          {admin && (
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
          )}
          <ScrollView
            style={{ backgroundColor: "rgb(47,47,47)", marginBottom: 40 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
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
                        navigation.navigate("Instruction", {
                          exercise: exercise,
                        });
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
                    </TouchableOpacity>
                  </Shadow>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
