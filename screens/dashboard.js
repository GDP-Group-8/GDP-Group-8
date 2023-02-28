import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, List } from "react-native-paper";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const GymClassesScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [dates, setDates] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const { currentUser, admin } = useAuth();
  const [availableClasses, setAvailableClasses] = useState({});
  const [classesToday, setClassesToday] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [membersInClass, setMembersInClass] = useState([]);
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    } else {
      const today = moment();
      const newDates = [];
      for (let i = -7; i <= 7; i++) {
        const date = moment(today).add(i, "days");
        newDates.push(date);
      }
      setDates(newDates);
      fetchData();
    }
  }, [navigation]);

  async function fetchData() {
    const res2 = await axios.get("https://gdp-api.herokuapp.com/classes/");
    // console.log(res2.data["2023-02-19"]);
    const res = await axios.get(
      "https://gdp-api.herokuapp.com/members/" + currentUser.uid
    );
    const upcoming = res.data[0].classes;
    const res3 = await axios.post(
      "https://gdp-api.herokuapp.com/classes/upcoming/",
      {
        classes: upcoming,
      }
    );
    setUpcomingClasses(res3.data);
    console.log(res3.data);
    setAvailableClasses(res2.data);

    setClassesToday(res2.data[selectedDate]);
    // console.log(availableClasses);
  }
  const handleDateChange = async (date) => {
    var formattedDate = date.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setClassesToday(availableClasses[formattedDate]);
    // console.log(selectedDate);
  };

  const handleBookClass = async (classID) => {
    const res = await axios.put(
      "https://gdp-api.herokuapp.com/classes/" + classID,
      {
        memberID: currentUser.uid,
      }
    );
    const res2 = await axios.put(
      "https://gdp-api.herokuapp.com/members/" + currentUser.uid,
      {
        classID: classID,
      }
    );
    console.log(res.data);
    console.log(res2.data);
    fetchData();
  };

  const handleCancelClass = async (classID) => {
    console.log(classID);
    const res = await axios.put(
      "https://gdp-api.herokuapp.com/classes/cancel/" + classID,
      {
        memberID: currentUser.uid,
      }
    );
    const res2 = await axios.put(
      "https://gdp-api.herokuapp.com/members/cancel/" + currentUser.uid,
      {
        classID: classID,
      }
    );

    fetchData();
  };
  const handleClassClick = async (gymClass) => {
    setSelectedClass(gymClass);
    //get members in class
    const res = await axios.post(
      "https://gdp-api.herokuapp.com/members/getMembers",
      {
        members: gymClass.members,
      }
    );

    if (!gymClass.workout) {
      setWorkout(null);
    } else {
      const res2 = await axios.get(
        "https://gdp-api.herokuapp.com/workouts/" + gymClass.workout
      );
      console.log(res2.data);
      setWorkout(res2.data);
    }
    setMembersInClass(res.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datePickerContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDateChange(date)}
              style={[
                styles.datePicker,
                selectedDate === date.format("YYYY-MM-DD") &&
                  styles.selectedDate,
                moment().isSame(date, "day") && styles.todayDate,
              ]}
            >
              <Text style={styles.dateText}>{date.format("ddd, MMM D")}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.availableClassesContainer}>
        <Text style={styles.sectionTitle}>Available Classes</Text>
        {classesToday && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {classesToday.map((gymClass, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleClassClick(gymClass)}
              >
                <View style={styles.card}>
                  <Text style={styles.className}>{gymClass.className}</Text>
                  <Text style={styles.spaces}>
                    Spaces Available: {gymClass.spacesAvailable}
                  </Text>
                  <Button
                    mode="contained"
                    disabled={
                      gymClass.spacesAvailable === 0 ||
                      gymClass.members.includes(currentUser.uid)
                    }
                    style={styles.button}
                    onPress={() => handleBookClass(gymClass.id)}
                  >
                    Book Now
                  </Button>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {!classesToday && (
          <Text style={styles.noClassesText}>
            No classes available on this day
          </Text>
        )}
        <Text style={styles.title}>Your Upcoming Classes</Text>
        {upcomingClasses && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {upcomingClasses.map((gymClass, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleClassClick(gymClass)}
              >
                <View style={styles.card}>
                  <Text style={styles.className}>{gymClass.className}</Text>
                  <Text style={styles.spaces}>
                    {moment(gymClass.date).format("ddd, MMM D, h:mm a")}
                  </Text>
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => handleCancelClass(gymClass._id)}
                  >
                    Cancel
                  </Button>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <Modal visible={selectedClass !== null} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>{selectedClass?.className}</Text>
            <Text style={styles.modalDescription}>
              {selectedClass?.description}
            </Text>
            {admin && (
              <View>
                <Text style={styles.modalHeader}>Members booked in:</Text>

                {membersInClass && (
                  <View>
                    {membersInClass.map((member, index) => (
                      <Text key={index} style={styles.modalDescription}>
                        {member.name}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}
            {workout && (
              <View>
                <Text style={styles.modalHeader}>Workout: {workout.name}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {workout.exercises.map((exercise, index) => (
                    <View styles={styles.card}>
                      <Text style={styles.modalDescription}>
                        {exercise.name}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF", // set background color to black
    paddingTop: 16,
  },
  datePickerContainer: {
    height: 100,
  },
  datePicker: {
    backgroundColor: "#222", // set background color to dark gray
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
  },
  selectedDate: {
    backgroundColor: "#4a90e2", // set background color to blue
  },
  todayDate: {
    backgroundColor: "#555", // set background color to a darker gray
  },
  dateText: {
    fontSize: 16,
    color: "#fff", // set text color to white
  },
  availableClassesContainer: {
    backgroundColor: "#333", // set background color to dark gray
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // set text color to white
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#222", // set background color to dark gray
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  excerciseCard: {
    backgroundColor: "#222", // set background color to dark gray
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // set text color to white
    marginBottom: 8,
  },
  spaces: {
    fontSize: 14,
    color: "#fff", // set text color to white
    marginBottom: 16,
  },
  button: {
    marginTop: "auto",
  },
  noClassesText: {
    fontSize: 16,
    color: "#fff", // set text color to white
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // set text color to white
    marginTop: 16,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222", // set background color to dark gray
    borderRadius: 8,
    padding: 16,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // set text color to white
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: "#fff", // set text color to white
    marginBottom: 16,
  },
  closeButton: {
    marginTop: "auto",
  },
});

export default GymClassesScreen;
