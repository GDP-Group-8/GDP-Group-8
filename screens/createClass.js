import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import ExerciseSelector from "../components/ExerciseSelector";
import { PaperSelect } from "react-native-paper-select";
const exercises = ["Push-ups", "Squats", "Lunges", "Sit-ups"];

const CreateClass = () => {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState("");
  const [workoutBlocks, setWorkoutBlocks] = useState({});
  const [selectedExercises, setSelectedExercises] = useState([]);
  const pickerRef = useRef();

  useEffect(() => {}, []);

  const handleAddExercise = (block) => {
    setWorkoutBlocks((prevBlocks) => ({
      ...prevBlocks,
      [block]: prevBlocks[block] ? prevBlocks[block] + 1 : 1,
    }));
  };
  const handleSelection = (exercises) => {
    console.log(exercises);
    setSelectedExercises(exercises);
  };

  const handleExerciseSelection = (exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(
        selectedExercises.filter((item) => item !== exercise)
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleSubmit = () => {
    // Validate form data
    if (!className || !description || !capacity || !date) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Submit the form data to your API or database
    console.log({
      className,
      description,
      capacity,
      date,
      selectedExercises,
    });

    // Clear the form
    setClassName("");
    setDescription("");
    setCapacity("");
    setDate("");
    setSelectedExercises([]);
    // Show confirmation popup
    Alert.alert("Success", "Class created successfully");
  };

  return (
    // <View style={styles.container}>
    //   <Text style={styles.heading}>Create a Class</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Class Name"
    //     value={className}
    //     onChangeText={setClassName}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Description"
    //     value={description}
    //     onChangeText={setDescription}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Capacity"
    //     keyboardType="numeric"
    //     value={capacity}
    //     onChangeText={setCapacity}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Date"
    //     value={date}
    //     onChangeText={setDate}
    //   />
    //    <Text style={styles.subHeading}>Workout Blocks:</Text>
    //   <View style={styles.blocksContainer}>
    //     <View style={styles.block}>
    //       <Text style={styles.blockHeading}>Block A:</Text>
    //       <Button title="Add Exercise" onPress={() => handleAddExercise("A")} />
    //       <Text style={styles.blockText}>
    //         {workoutBlocks["A"] || 0} exercises
    //       </Text>
    //     </View>
    //     <View style={styles.block}>
    //       <Text style={styles.blockHeading}>Block B:</Text>
    //       <Button title="Add Exercise" onPress={() => handleAddExercise("B")} />
    //       <Text style={styles.blockText}>
    //         {workoutBlocks["B"] || 0} exercises
    //       </Text>
    //     </View>
    //     <View style={styles.block}>
    //       <Text style={styles.blockHeading}>Block C:</Text>
    //       <Button title="Add Exercise" onPress={() => handleAddExercise("C")} />
    //       <Text style={styles.blockText}>
    //         {workoutBlocks["C"] || 0} exercises
    //       </Text>
    //     </View>
    //     <View style={styles.block}>
    //       <Text style={styles.blockHeading}>Block D:</Text>
    //       <Button title="Add Exercise" onPress={() => handleAddExercise("D")} />
    //       <Text style={styles.blockText}>
    //         {workoutBlocks["D"] || 0} exercises
    //       </Text>
    //     </View>
    //   </View>
    //   <Button title="Create Class" onPress={handleSubmit} />
    // </View>
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Class</Text>
      <TextInput
        style={styles.input}
        placeholder="Class Name"
        value={className}
        onChangeText={setClassName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Capacity"
        keyboardType="numeric"
        value={capacity}
        onChangeText={setCapacity}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <ExerciseSelector onSelection={handleSelection}></ExerciseSelector>
      <Button title="Create Class" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 18,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  blocksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  block: {
    width: "23%",
    alignItems: "center",
  },
  blockHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  blockText: {
    fontSize: 16,
  },
});

export default CreateClass;
