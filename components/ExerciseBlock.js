import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
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
        `http://192.168.170.179:5000/workouts/exercise/${workoutId}?exerciseId=${exerciseId}`,
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
                onChangeText={(text) =>
                  updateExercise(exercise._id, "weight", text)
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
