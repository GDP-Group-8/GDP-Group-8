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
import { yourIp } from "../firebase";
import { Dimensions } from "react-native";
const primaryColor = "orange"; // Orange
const secondaryColor = "#2F2F2F"; // Dark gray
const backgroundColor = "#111"; // Even darker gray for background

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
    const res = await axios.get(yourIp + "/workouts");
    console.log(res.data);

    setWorkouts(res.data);
  };

  const getInstructors = async () => {
    const res = await axios.get(yourIp + "/members");
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
    const res2 = await axios.post(yourIp + "/classes", {
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

  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.heading, textAlign: "center", color: "white" }}>
        Create a Class
      </Text>
      <Text style={{ color: "white", marginBottom: 4 }}>Class Name</Text>
      <TextInput
        style={styles.input}
        value={className}
        onChangeText={setClassName}
      />
      <Text style={{ color: "white", marginBottom: 4 }}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={{ color: "white", marginBottom: 4 }}>Capacity</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={capacity}
        onChangeText={setCapacity}
      />
      <View
        style={{
          backgroundColor: "#FFA50080",
          height: 1,
          marginBottom: 10,
          marginTop: 10,
          width: width * 0.9 + 16,
          marginLeft: -8,
        }}
      ></View>
      <Text style={{ color: "white", marginBottom: 4 }}>Instructor</Text>
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
            style={{ fontSize: 12 }}
          />
        ))}
      </Picker>
      {/* <View style={styles.pickerContainer}></View> */}
      <Text style={{ color: "white", marginBottom: 4 }}>Workout</Text>
      <Picker
        selectedValue={selectedWorkout}
        style={{ ...styles.picker, marginBottom: 0 }}
        onValueChange={(itemValue, itemIndex) => setSelectedWorkout(itemValue)}
      >
        {workouts.map((workout) => (
          <Picker.Item
            key={workout._id}
            label={workout.name}
            value={workout._id}
            style={{ fontSize: 12 }}
          />
        ))}
      </Picker>
      <View
        style={{
          backgroundColor: "#FFA50080",
          height: 1,
          marginBottom: 10,
          marginTop: 10,
          width: width * 0.9 + 16,
          marginLeft: -8,
        }}
      ></View>
      {/* <View style={styles.pickerContainer}></View> */}
      {/* <Text
        style={{
          color: "white",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Or
      </Text> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={handleShowDatePicker}
          >
            <Text style={{ color: "white" }}>{date.toDateString()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={{ ...styles.pickerLabel, textAlign: "right" }}>
            Time
          </Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={handleShowTimePicker}
          >
            <Text style={{ color: "white" }}>
              {((date) => {
                const s = date.toLocaleTimeString("en-GB", {
                  timeStyle: "medium",
                });
                const hour = +s.slice(0, 2);
                const minute = s.slice(3, 5);
                const amOrPm = hour >= 12 ? "pm" : "am";
                const h = ((hour % 12 || 12) + "").padStart(2, "0");
                return `${h}:${minute} ${amOrPm}`;
              })(date)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        mode="contained"
        style={styles.button}
        buttonColor="#2d2d2d"
        onPress={() => navigation.navigate("CreateWorkout")}
      >
        Create Workout
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        buttonColor="#2d2d2d"
        onPress={handleSubmit}
      >
        Create Class
      </Button>
      {showDatePicker && (
        <DateTimePicker mode="date" value={date} onChange={onDateChange} />
      )}
      {showTimePicker && (
        <DateTimePicker mode="time" value={date} onChange={onTimeChange} />
      )}
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
    height: 45,
    borderWidth: 1,
    borderColor: secondaryColor,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: secondaryColor,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 24,
    color: "primaryColor",
  },
  pickerContainer: {
    // flexDirection: "column",
    // alignItems: "center",
    marginBottom: 10,
  },
  pickerLabel: {
    // marginRight: 10,
    // fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  picker: {
    borderWidth: 1,
    borderColor: secondaryColor,
    borderRadius: 5,
    backgroundColor: secondaryColor,
    color: "white",
    marginBottom: 10,
    height: 20,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: secondaryColor,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: secondaryColor,
    color: primaryColor,
  },
  customButton: {
    backgroundColor: primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    // marginTop: 20,
    // marginBottom: 20,
    marginVertical: 20,
  },
  customButtonText: {
    color: backgroundColor,
    fontSize: 18,
  },

  button: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 11,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 20,
    color: backgroundColor,
    fontWeight: "bold",
  },
});

export default CreateClass;
