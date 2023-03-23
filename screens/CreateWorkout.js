import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableHighlight,
} from "react-native";
import { FontFamily, Color } from "../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";

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
    <View style={styles.exerciseContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercise Name</Text>
        <ExerciseDropdown
          exercises={exercises}
          onChange={handleExerciseChange}
        />
        {/* <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpButtonText}>?</Text>
          <Image
            style={styles.helpButtonImage}
            resizeMode="cover"
            source={require("../assets/ellipse-1.png")}
          />
        </TouchableOpacity> */}
      </View>

      {selectedExercise && (
        <View style={styles.body}>
          {sets.map((set, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.repsText}>Set {index + 1}:</Text>
              <TextInput
                style={styles.weightText}
                keyboardType="numeric"
                placeholder="Reps"
                placeholderTextColor={Color.gainsboro_100}
                value={set.reps}
                onChangeText={(reps) => handleSetRepsChange(index, reps)}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveSet(index)}
              >
                <Text style={styles.removeButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddSet}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const ExerciseDropdown = ({ exercises, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExerciseChange = (item) => {
    setSelectedExercise(item);
    onChange(item);
    setModalVisible(false);
  };

  const dropdownItems = exercises.map((exercise) => ({
    id: exercise._id,
    name: `${exercise.name}`,
  }));

  return (
    <View>
      <TouchableHighlight
        onPress={() => setModalVisible(true)}
        style={styles.dropdownContainer}
      >
        <Text style={styles.dropdownItemText}>
          {selectedExercise ? selectedExercise.name : "Select Exercise"}
        </Text>
      </TouchableHighlight>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={dropdownItems}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => handleExerciseChange(item)}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalText}>{item.name}</Text>
                </TouchableHighlight>
              )}
              keyExtractor={(item) => item.id}
            />
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// const ExerciseDropdown = ({ exercises, onChange }) => {
//   const [selectedExercise, setSelectedExercise] = useState(null);

//   const handleExerciseChange = (item) => {
//     setSelectedExercise(item);
//     console.log(item);
//     onChange(item);
//   };

//   const dropdownItems = exercises.map((exercise) => ({
//     id: exercise._id,
//     name: `${exercise.name}`,
//   }));

//   return (
//     <View>
//       <SearchableDropdown
//         onTextChange={(text) => console.log(text)}
//         onItemSelect={handleExerciseChange}
//         // containerStyle={styles.dropdownContainer}
//         itemStyle={styles.dropdownItem}
//         itemTextStyle={styles.dropdownItemText}
//         itemsContainerStyle={styles.dropdownItemsContainer}
//         items={dropdownItems}
//         placeholder={
//           selectedExercise ? selectedExercise.name : "Select Exercise"
//         }
//         placeholderTextColor={Color.gainsboro_100}
//         placeholderStyle={styles.dropdownItemText}
//         resetValue={false}
//         textInputProps={{ style: styles.dropdownTextInput }}
//       />
//     </View>
//   );
// };

const CreateWorkoutScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const { currentUser, currentUserUid } = useAuth();

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    const response = await fetch("http://10.6.20.74:5000/exercises");
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
    const res = await axios.post("http://10.6.20.74:5000/workouts", {
      name: workoutName,
      type: workoutType,
      member_id: currentUserUid,
      exercises: workoutData,
    });
    console.log(res.data._id);
    alert("Workout Saved");
    //go back with workout id
    navigation.navigate("CreateClass", { workoutId: res.data._id });
  };

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: Color.gray_100 }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.header}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Workout Name</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Color.gainsboro_100}
                  placeholder="Enter workout name"
                  onChangeText={setWorkoutName}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Workout Type</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Color.gainsboro_100}
                  placeholder="Enter workout type"
                  onChangeText={setWorkoutType}
                />
              </View>
            </View>

            <View style={styles.body}>{exerciseCards}</View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddExercise}
            >
              <Text style={styles.addButtonText}>Add Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSaveWorkout}
            >
              <Text style={styles.addButtonText}>Save Workout</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
    fontSize: 16,
    fontWeight: "bold",
    color: Color.gainsboro_100,
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.gainsboro_100,
  },
  exerciseContainer: {
    backgroundColor: Color.darkslategray,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Color.gainsboro_100,
  },
  helpButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.gainsboro_100,
  },
  helpButtonText: {
    fontSize: 16,
    marginRight: 5,
    color: Color.gainsboro_100,
  },
  helpButtonImage: {
    width: 20,
    height: 20,
  },
  body: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  repsText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Color.gainsboro_100,
  },
  weightText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Color.gainsboro_100,
  },
  set1Text: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: Color.gainsboro_100,
  },
  set2Text: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: Color.gainsboro_100,
  },
  set3Text: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: Color.gainsboro_100,
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: Color.darkgoldenrod_200,
    width: "100%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 20,
    color: Color.gainsboro_100,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    backgroundColor: Color.darkslategray,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.gainsboro_100,
  },
  closeButton: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
});
export default CreateWorkoutScreen;
