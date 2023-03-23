import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const primaryColor = "orange"; // Orange
const secondaryColor = "#2F2F2F"; // Dark gray
const backgroundColor = "#1E1E1E"; // Even darker gray for background

const CreateClass = ({ navigation, workoutID }) => {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [instructors, setInstructors] = useState([]); // example instructor list
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [workouts, setWorkouts] = useState([]); // example workout list
  const [selectedWorkout, setSelectedWorkout] = useState(workoutID);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getWorkouts();
      getInstructors();
    });
    return unsubscribe;
  }, []);

  const getWorkouts = async () => {
    const res = await axios.get("http://10.6.20.74:5000/workouts");
    console.log(res.data);

    setWorkouts(res.data);
  };

  const getInstructors = async () => {
    const res = await axios.get("http://10.6.20.74:5000/members");
    //go through the list of users and filter out the instructors
    console.log(res.data);
    const instructors = res.data.filter((user) => user.admin === true);
    console.log(instructors);
    setInstructors(instructors);
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
      selectedInstructor,
      selectedWorkout,
    });
    await createClass();
    // await createClass(workoutID);

    // Clear the form
    setClassName("");
    setDescription("");
    setCapacity("");
    setDate(new Date());
    setSelectedExercises([]);
    setSelectedInstructor("");
    setSelectedWorkout("");
    // Show confirmation popup
    Alert.alert("Success", "Class created successfully");
  };

  const createClass = async () => {
    const formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .replace("Z", "+00:00");
    const res2 = await axios.post("http://10.6.20.74:5000/classes", {
      name: className,
      description: description,
      capacity: capacity,
      date: formattedDate,
      workout: selectedWorkout,
      instructor: selectedInstructor,
    });
    console.log(res2);
  };

  const CustomButton = ({ children, onPress }) => {
    return (
      <TouchableOpacity style={styles.customButton} onPress={onPress}>
        <Text style={styles.customButtonText}>{children}</Text>
      </TouchableOpacity>
    );
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
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Instructor:</Text>
        <Picker
          selectedValue={selectedInstructor}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedInstructor(itemValue)
          }
        >
          {instructors.map((instructor) => (
            <Picker.Item
              key={instructor}
              label={instructor.name}
              value={instructor.memberID}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Workout:</Text>
        <Picker
          selectedValue={selectedWorkout}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedWorkout(itemValue)
          }
        >
          {workouts.map((workout) => (
            <Picker.Item
              key={workout._id}
              label={workout.name}
              value={workout._id}
            />
          ))}
        </Picker>
      </View>
      <Text>Or</Text>
      <Button
        mode="contained"
        styles={styles.button}
        buttonColor="orange"
        onPress={() => {
          navigation.navigate("CreateWorkout");
        }}
      >
        Create Workout
      </Button>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select day:</Text>

        <TouchableOpacity
          style={styles.dateInput}
          onPress={handleShowDatePicker}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Time:</Text>

        <TouchableOpacity
          style={styles.dateInput}
          onPress={handleShowTimePicker}
        >
          <Text>{date.toLocaleTimeString()}</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker mode="date" value={date} onChange={onDateChange} />
      )}
      {showTimePicker && (
        <DateTimePicker mode="time" value={date} onChange={onTimeChange} />
      )}

      <Button
        mode="contained"
        styles={styles.button}
        buttonColor="orange"
        onPress={handleSubmit}
      >
        Create Class
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: backgroundColor,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: secondaryColor,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: primaryColor,
    backgroundColor: secondaryColor,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 24,
    color: primaryColor,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pickerLabel: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: primaryColor,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: secondaryColor,
    borderRadius: 5,
    backgroundColor: secondaryColor,
    color: primaryColor,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: secondaryColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: secondaryColor,
    color: primaryColor,
  },
  customButton: {
    backgroundColor: primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  customButtonText: {
    color: backgroundColor,
    fontSize: 18,
  },
  button: {
    color: "orange",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: backgroundColor,
    fontWeight: "bold",
  },
});

export default CreateClass;
