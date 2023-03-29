import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

const ExerciseSelector = ({ onSelection }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(yourIp + "/exercises");
    const data = await response.json();
    setAvailableExercises(data);
  };

  //   tcons availableExercises = [
  //     { name: "Exercise 1", id: "1" },
  //     { name: "Exercise 2", id: "2" },
  //     { name: "Exercise 3", id: "3" },
  //     { name: "Exercise 4", id: "4" },
  //   ];

  const handleExerciseSelection = (exercise) => {
    const isSelected = selectedExercises.includes(exercise);
    if (isSelected) {
      setSelectedExercises(selectedExercises.filter((ex) => ex !== exercise));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
    onSelection(selectedExercises);
  };
  const handleRemoveExercise = (exercise) => {
    setSelectedExercises(selectedExercises.filter((ex) => ex !== exercise));
    onSelection(selectedExercises);
  };
  const handleSubmit = () => {
    setModalVisible(false);
    onSelection(selectedExercises);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.input}
      >
        {selectedExercises.length === 0 ? (
          <Text style={styles.placeholder}>Select exercises...</Text>
        ) : (
          selectedExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              onPress={() => handleRemoveExercise(exercise)}
            >
              <Text style={styles.selected}>{exercise.name} x</Text>
            </TouchableOpacity>
          ))
        )}
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select exercises:</Text>
          <ScrollView>
            {availableExercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={[
                  styles.exercise,
                  selectedExercises.includes(exercise) &&
                    styles.selectedExercise,
                ]}
                onPress={() => handleExerciseSelection(exercise)}
              >
                <Text>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 30,
    borderRadius: 5,
  },
  placeholder: {
    color: "#ccc",
  },
  selected: {
    marginRight: 5,
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exercise: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedExercise: {
    backgroundColor: "#ddd",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default ExerciseSelector;
