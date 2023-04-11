import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { yourIp } from "../firebase";
import { Dimensions } from "react-native";

const ExerciseBlock = ({ exercises, bookedIn, workoutId }) => {
  const groupedExercises = exercises.reduce((acc, exercise) => {
    console.log(exercise);
    if (!acc[exercise.exercise]) {
      acc[exercise.exercise] = [];
    }
    acc[exercise.exercise].push(exercise);
    return acc;
  }, {});

  const handleOnPress = () => {
    console.log(exercises);
  };
  const updateExercise = async (exerciseId, field, value) => {
    try {
      const response = await fetch(
        yourIp + `/workouts/exercise/${workoutId}?exerciseId=${exerciseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: value }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating exercise");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { width: deviceWidth } = Dimensions.get("window");

  return (
    <View style={{ width: deviceWidth * 0.92 }}>
      {Object.entries(groupedExercises).map(([name, exercises]) => (
        <View
          style={{
            backgroundColor: "#2f2f2f",
            marginBottom: 16,
            borderRadius: 8,
          }}
          key={name}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              height: 40,
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                ...styles.exerciseName,
                flex: 1,
                paddingLeft: 8,
                height: "100%",
                textAlignVertical: "center",
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: "white",
                height: 40,
                aspectRatio: 1,
                fontSize: 20,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              {"ⓘ"}
            </Text>
          </View>
          {exercises.map((exercise) => (
            <View
              style={{
                ...styles.setContainer,
                borderBottomColor: "white",
                borderBottomWidth: 1,
                flex: 1,
                flexDirection: "row",
                height: 40,
                alignContent: "center",
              }}
              key={exercise._id}
            >
              <Text
                style={{
                  ...styles.setLabel,
                  flex: 103,
                  textAlign: "center",
                  marginRight: 0,
                  marginLeft: 0,
                }}
              >
                {exercise.set}
              </Text>
              <TextInput
                style={{
                  flex: 432,
                  textAlign: "right",
                  padding: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  color: "white",
                  paddingRight: 2,
                  fontWeight: "bold",
                }}
                keyboardType="numeric"
                maxLength={3}
                editable={bookedIn}
                defaultValue={`${exercise.reps}`}
                onChangeText={(text) =>
                  updateExercise(exercise._id, "reps", text)
                }
              />
              <Text
                style={{
                  ...styles.repLabel,
                  flex: 150,
                  textAlign: "left",
                  marginLeft: 0,
                  marginRight: 0,
                  fontSize: 11,
                  fontWeight: "300",
                }}
              >
                reps
              </Text>

              {/* <Text
                style={{
                  flex: 249,
                  textAlign: "right",
                  marginLeft: 0,
                  marginRight: 0,
                  color: "white",
                  paddingRight: 2,
                  fontWeight: "bold",
                }}
              >
                {exercise.weight}
              </Text> */}
              <TextInput
                style={{
                  flex: 249,
                  textAlign: "right",
                  marginLeft: 0,
                  marginRight: 0,
                  color: "white",
                  paddingRight: 2,
                  fontWeight: "bold",
                }}
                keyboardType="numeric"
                maxLength={5}
                editable={bookedIn}
                defaultValue={`${exercise.weight}`}
                onChangeText={(text) =>
                  updateExercise(exercise._id, "weight", text)
                }
              />
              <Text
                style={{
                  ...styles.weightLabel,
                  flex: 191,
                  textAlign: "left",
                  marginLeft: 0,
                  marginRight: 0,
                  fontSize: 11,
                  fontWeight: "300",
                }}
              >
                kg
              </Text>
              {/* <TextInput
                style={styles.weightInput}
                keyboardType="numeric"
                maxLength={5}
                editable={bookedIn}
                defaultValue={`${exercise.weight}`}
                onChangeText={(text) =>
                  updateExercise(exercise._id, "weight", text)
                }
              /> */}
            </View>
          ))}
          <View>
            <Text></Text>
          </View>
        </View>
      ))}
      <View style={{ alignItems: "center", marginTop: 16 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseContainer: {
    marginBottom: 16,
    backgroundColor: "#444",
    borderRadius: 8,
    padding: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  setContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  setLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
  },
  repLabel: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 16,
    marginRight: 8,
  },
  repInput: {
    width: 50,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 4,
    marginRight: 8,
  },
  weightLabel: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 16,
    marginRight: 8,
  },
  weightInput: {
    width: 60,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 4,
  },
});

export default ExerciseBlock;
