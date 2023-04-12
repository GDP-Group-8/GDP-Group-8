import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { yourIp } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const ExerciseBlock = ({ exercises, bookedIn, workoutId }) => {
  const { currentUser, admin } = useAuth();

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

  const updateRecords = async (exercise, value) => {
    try {
      const today = new Date();
      const date = today.toLocaleDateString();
      const response = await fetch(
        `https://gdp-api.herokuapp.com/records`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //member, exercise, date, weight
          body: JSON.stringify({
            member: currentUser.uid,
            exercise: exercise,
            date: date,
            weight: value
          })
        }
      );

      if (!response.ok) {
        throw new Error("Error updating exercise");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
  return (
    <View>
      {Object.entries(groupedExercises).map(([name, exercises]) => (
        <View style={styles.exerciseContainer} key={name}>
          <Text style={styles.exerciseName}>{name}</Text>
          {exercises.map((exercise) => (
            <View style={styles.setContainer} key={exercise._id}>
              <Text style={styles.setLabel}>Set {exercise.set}:</Text>
              <Text style={styles.repLabel}>Reps:</Text>
              <TextInput
                style={styles.repInput}
                keyboardType="numeric"
                maxLength={3}
                editable={bookedIn}
                defaultValue={`${exercise.reps}`}
                onChangeText={(text) =>
                  updateExercise(exercise._id, "reps", text)
                }
              />
              <Text style={styles.weightLabel}>Weight (kg):</Text>
              <TextInput
                style={styles.weightInput}
                keyboardType="numeric"
                maxLength={5}
                editable={bookedIn}
                defaultValue={`${exercise.weight}`}
                onChangeText={(text) =>{
                  updateExercise(exercise._id, "weight", text)
                  updateRecords(exercise.exerciseName, text)
                }
                }
              />
            </View>
          ))}
        </View>
      ))}
      {/* button */}
      <View style={{ alignItems: "center", marginTop: 16 }}>
        <Button
          mode="contained"
          onPress={handleOnPress}
          style={{ width: 200, backgroundColor: "#444" }}
        >
          Save
        </Button>
      </View>
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
