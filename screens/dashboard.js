import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import moment from "moment";

const classes = [
  {
    name: "Yoga",
    spaces: 10,
    description: "A relaxing and meditative yoga class.",
  },
  {
    name: "Pilates",
    spaces: 5,
    description:
      "A class that focuses on building core strength and flexibility.",
  },
  {
    name: "Spinning",
    spaces: 3,
    description: "An intense cardio workout on stationary bikes.",
  },
  {
    name: "Zumba",
    spaces: 7,
    description:
      "A high-energy dance class that combines Latin rhythms with cardiovascular exercise.",
  },
];

const GymClassesScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [dates, setDates] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const today = moment();
    const newDates = [];
    for (let i = -7; i <= 7; i++) {
      const date = moment(today).add(i, "days");
      newDates.push(date);
    }
    setDates(newDates);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  const handleClassClick = (gymClass) => {
    setSelectedClass(gymClass);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDateChange(date)}
            style={[
              styles.datePicker,
              selectedDate === date.format("YYYY-MM-DD") && styles.selectedDate,
              moment().isSame(date, "day") && styles.todayDate,
            ]}
          >
            <Text style={styles.dateText}>{date.format("ddd, MMM D")}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {classes.map((gymClass, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleClassClick(gymClass)}
          >
            <View style={styles.card}>
              <Text style={styles.className}>{gymClass.name}</Text>
              <Text style={styles.spaces}>
                Spaces Available: {gymClass.spaces}
              </Text>
              <Button
                mode="contained"
                disabled={gymClass.spaces === 0}
                style={styles.button}
                onPress={() => {}}
              >
                Book Now
              </Button>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal visible={selectedClass !== null} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>{selectedClass?.name}</Text>
          <Text style={styles.modalDescription}>
            {selectedClass?.description}
          </Text>
          <Button
            mode="contained"
            style={styles.closeButton}
            onPress={() => setSelectedClass(null)}
          >
            Close
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  datePicker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
  },
  selectedDate: {
    backgroundColor: "#4a90",
  },
  todayDate: {
    backgroundColor: "#f0f0f0",
  },
  dateText: {
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  spaces: {
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    marginTop: "auto",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  closeButton: {
    marginTop: "auto",
  },
});

export default GymClassesScreen;
