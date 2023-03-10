import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import ExerciseSelector from "../components/ExerciseSelector";
const exercises = ["Push-ups", "Squats", "Lunges", "Sit-ups"];

const CreateClass = ({ navigation }) => {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [workoutId, setWorkoutId] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {}, []);

  const handleSelection = (exercises) => {
    console.log(exercises);
    setSelectedExercises(exercises);
  };

  const onDateChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    console.log(selectedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    console.log(selectedTime);
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentTime);
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleShowTimePicker = () => {
    setShowTimePicker(true);
  };
  const handleSubmit = async () => {
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
    await createWorkout();
    // await createClass(workoutID);

    // Clear the form
    setClassName("");
    setDescription("");
    setCapacity("");
    setDate(new Date());
    setSelectedExercises([]);
    // Show confirmation popup
    Alert.alert("Success", "Class created successfully");
  };

  const createWorkout = async () => {
    // console.log("create workout");
    // console.log(selectedExercises);
    const res = await axios.post("http://192.168.170.179:5000/workouts", {
      exercises: selectedExercises,
    });
    console.log(res.data._id);
    const formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .replace("Z", "+00:00");
    const res2 = await axios.post("http://192.168.170.179:5000/classes", {
      name: className,
      description: description,
      capacity: capacity,
      date: formattedDate,
      workout: res.data._id,
    });
    console.log(res2);
  };
  const createClass = async (workoutID) => {
    console.log(workoutId);
    const res = await axios.post("http://192.168.170.179:5000/classes", {
      name: className,
      description: description,
      capacity: capacity,
      date: date,
      workout: workoutID,
    });
    return res;
  };

  return (
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
      <TouchableOpacity style={styles.dateInput} onPress={handleShowDatePicker}>
        <Text>{date.toUTCString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateInput} onPress={handleShowTimePicker}>
        <Text>{date.toTimeString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker mode="date" value={date} onChange={onDateChange} />
      )}
      {showTimePicker && (
        <DateTimePicker mode="time" value={date} onChange={onTimeChange} />
      )}
      <ExerciseSelector onSelection={handleSelection}></ExerciseSelector>
      <Button mode="contained" styles={styles.button} onPress={handleSubmit}>
        Create Class
      </Button>
      <Button
        mode="contained"
        styles={styles.button}
        onPress={() => {
          navigation.navigate("CreateWorkout");
        }}
      >
        Create Workout
      </Button>
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
  button: {
    marginTop: 20,
    padding: 10,
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
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default CreateClass;
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
//   const handleExerciseSelection = (exercise) => {
//     if (selectedExercises.includes(exercise)) {
//       setSelectedExercises(
//         selectedExercises.filter((item) => item !== exercise)
//       );
//     } else {
//       setSelectedExercises([...selectedExercises, exercise]);
//     }
//   };
//   const handleAddExercise = (block) => {
//     setWorkoutBlocks((prevBlocks) => ({
//       ...prevBlocks,
//       [block]: prevBlocks[block] ? prevBlocks[block] + 1 : 1,
//     }));
//   };
