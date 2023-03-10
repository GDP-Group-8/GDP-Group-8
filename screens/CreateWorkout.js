import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SearchableDropdown from "react-native-searchable-dropdown";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const ExerciseCard = ({
  exercises,
  onExerciseDataChange,
  workoutData,
  setWorkoutData,
}) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [sets, setSets] = useState([{ reps: "" }]);

  const handleAddSet = () => {
    setSets([...sets, { reps: "" }]);
  };

  const handleSetRepsChange = (index, reps) => {
    const newSets = [...sets];
    newSets[index].reps = reps;
    setSets(newSets);
    const exerciseData = newSets.map((set, i) => ({
      exercise: selectedExercise.name,
      set: i + 1,
      reps: parseInt(set.reps),
    }));
    onExerciseDataChange(exerciseData);
  };

  const handleRemoveSet = (index) => {
    const newSets = [...sets];
    newSets.splice(index, 1);
    setSets(newSets);
    const exerciseData = newSets.map((set, i) => ({
      exercise: selectedExercise.name,
      set: i + 1,
      reps: parseInt(set.reps),
    }));
    onExerciseDataChange(exerciseData);
  };

  const handleExerciseChange = (exerciseId) => {
    setSelectedExercise(exerciseId);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Exercise Name</Text>
      <ExerciseDropdown exercises={exercises} onChange={handleExerciseChange} />
      {selectedExercise && (
        <>
          {sets.map((set, index) => (
            <View key={index} style={styles.setRow}>
              <Text style={styles.repsInput}>Set {index + 1}:</Text>
              <TextInput
                style={styles.setLabel}
                keyboardType="numeric"
                placeholder="Reps"
                value={set.reps}
                onChangeText={(reps) => handleSetRepsChange(index, reps)}
              />
              <Button
                title="Remove Set"
                onPress={() => handleRemoveSet(index)}
              />
            </View>
          ))}
          <Button title="Add Set" onPress={handleAddSet} />
        </>
      )}
    </View>
  );
};

const ExerciseDropdown = ({ exercises, onChange }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExerciseChange = (item) => {
    setSelectedExercise(item);
    console.log(item);
    onChange(item);
  };

  const dropdownItems = exercises.map((exercise) => ({
    id: exercise._id,
    name: `${exercise.name}`,
  }));

  return (
    <View>
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        onItemSelect={handleExerciseChange}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.dropdownItem}
        itemTextStyle={styles.dropdownItemText}
        itemsContainerStyle={styles.dropdownItemsContainer}
        items={dropdownItems}
        placeholder={
          selectedExercise ? selectedExercise.name : "Select Exercise"
        }
        resetValue={false}
        textInputProps={{ style: styles.dropdownTextInput }}
      />
    </View>
  );
};

const CreateWorkoutScreen = () => {
  const [exercises, setExercises] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const { currentUser, currentUserUid } = useAuth();

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    const response = await fetch("http://192.168.170.179:5000/exercises");
    const data = await response.json();
    console.log(data[0]._id);
    setExercises(data);
  };

  const [exerciseCards, setExerciseCards] = useState([]);

  const handleAddExercise = () => {
    setExerciseCards([
      ...exerciseCards,
      <ExerciseCard
        key={exerciseCards.length}
        exercises={exercises}
        workoutData={workoutData}
        setWorkoutData={setWorkoutData}
        onExerciseDataChange={(data) => {
          const newData = [...workoutData, ...data];
          setWorkoutData(newData);
        }}
      />,
    ]);
  };

  const handleSaveWorkout = async () => {
    const workout = {
      name: workoutName,
      type: workoutType,
      member_id: currentUserUid,
      exercises: workoutData,
    };
    console.log(workout);
    const res = await axios.post("http://192.168.170.179:5000/exercises", {
      name: workoutName,
      type: workoutType,
      member_id: currentUserUid,
      exercises: workoutData,
    });
    console.log(res);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Workout Name"
            onChangeText={setWorkoutName}
          />
          <TextInput
            style={styles.input}
            placeholder="Workout Type"
            onChangeText={setWorkoutType}
          />
        </View>
        <View>{exerciseCards}</View>
        <Button title="Add Exercise" onPress={handleAddExercise} />
        <Button title="Save Workout" onPress={handleSaveWorkout} />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  inputs: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdown: {
    // add styles for dropdown component here
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  setLabel: {
    marginRight: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownTextInput: {
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dropdownItemsContainer: {
    maxHeight: 140,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default CreateWorkoutScreen;
