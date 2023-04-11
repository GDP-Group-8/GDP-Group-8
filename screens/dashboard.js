import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Card,
  FlatList,
  TextInput,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import { yourIp } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, List } from "react-native-paper";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import ExerciseBlock from "../components/ExerciseBlock";
import CalenderStrip from "react-native-calendar-strip";
const images = {
  image_0: require("../assets/image_0.png"),
  image_1: require("../assets/image_1.png"),
  image_2: require("../assets/image_2.png"),
  image_3: require("../assets/image_3.png"),
  image_4: require("../assets/image_4.png"),
  image_5: require("../assets/image_5.png"),
  image_6: require("../assets/image_6.png"),
  image_7: require("../assets/image_7.png"),
  image_8: require("../assets/image_8.png"),
  image_9: require("../assets/image_9.png"),
  image_10: require("../assets/image_10.png"),
  image_11: require("../assets/image_11.png"),
};
// import { Row, Col } from 'react-native-flexbox-grid';

const { width, height } = Dimensions.get("window");

const GymClassesScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [dates, setDates] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const { currentUser, admin, currentUserUid } = useAuth();
  const [availableClasses, setAvailableClasses] = useState({});
  const [classesToday, setClassesToday] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [membersInClass, setMembersInClass] = useState([]);
  const [workout, setWorkout] = useState(null);
  const [bookedIn, setBookedIn] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [imageIndex, setImageIndex] = useState("image_0");
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
      var formattedDate = moment().format("YYYY-MM-DD");
      setSelectedDate(formattedDate);
      setClassesToday(availableClasses[formattedDate]);
    }
  }, [currentUser, navigation]);
  //refresh data when we navigate to this page
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    var formattedDate = moment().format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setClassesToday(availableClasses[formattedDate]);
    setRefreshing(false);
  }, []);
  async function fetchData() {
    const res2 = await axios.get(yourIp + "/classes/");
    // console.log(res2.data["2023-02-19"]);
    const res = await axios.get(yourIp + "/members/" + currentUser.uid);
    const upcoming = res.data[0].classes;
    console.log(upcoming);
    const res3 = await axios.post(yourIp + "/classes/upcoming/", {
      classes: upcoming,
    });
    setUpcomingClasses(res3.data);
    setAvailableClasses(res2.data);

    setClassesToday(res2.data[selectedDate]);
    // console.log(availableClasses);
  }

  // Helper function to check if the class time has already passed
  const isClassPast = (classTime) => {
    //use Selected date and class time to create a moment object
    const classMoment = moment(
      selectedDate + " " + classTime,
      "YYYY-MM-DD HH:mm"
    );

    return moment().isAfter(classMoment);
  };

  const handleDateChange = async (date) => {
    var formattedDate = date.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setClassesToday(availableClasses[formattedDate]);
    // console.log(selectedDate);
  };

  const handleBookClass = async (classID, workoutId) => {
    try {
      const res = await axios.put(yourIp + "/classes/" + classID, {
        memberID: currentUser.uid,
      });

      const duplicateRes = await axios.post(
        yourIp + `/workouts/duplicate/${workoutId}`,
        {
          memberID: currentUser.uid,
        }
      );

      const res2 = await axios.put(yourIp + "/members/" + currentUser.uid, {
        classID: classID,
        workoutID: duplicateRes.data._id,
      });

      fetchData();
    } catch (error) {
      console.error("Error in handleBookClass:", error);
    }
  };

  const handleCancelClass = async (classID) => {
    const res = await axios.put(yourIp + "/classes/cancel/" + classID, {
      memberID: currentUser.uid,
    });
    const res2 = await axios.put(
      yourIp + "/members/cancel/" + currentUser.uid,
      {
        classID: classID,
      }
    );

    fetchData();
  };
  const handleClassClick = async (gymClass) => {
    setSelectedClass(gymClass);
    //get members in class
    const res = await axios.post(yourIp + "/members/getMembers", {
      members: gymClass.members,
    });

    if (!gymClass.workout) {
      setWorkout(null);
    } else {
      const res2 = await axios.get(yourIp + "/workouts/" + gymClass.workout);
      setWorkout(res2.data);
    }
    setMembersInClass(res.data);
  };

  const handleBookedClassClick = async (gymClass) => {
    setBookedIn(true);
    setSelectedClass(gymClass);
    //get members in class
    //get workout from workout id in members class
    const getMemberWorkout = await axios.post(
      yourIp + "/members/getWorkout/" + currentUser.uid,
      {
        classID: gymClass._id,
      }
    );

    const res = await axios.post(yourIp + "/members/getMembers", {
      members: gymClass.members,
    });

    if (!gymClass.workout) {
      setWorkout(null);
    } else {
      const res2 = await axios.get(
        yourIp + "/workouts/" + getMemberWorkout.data[0].workout
      );
      setWorkout(res2.data);
    }
    setMembersInClass(res.data);
  };

  const closeModal = () => {
    setSelectedClass(null);
    setMembersInClass(null);
    setWorkout(null);
    setBookedIn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalenderStrip
        numDaysInWeek={7}
        scrollable
        scrollerPaging
        onDateSelected={(date) => handleDateChange(moment(date))}
        scrollToOnSetSelectedDate={false}
        selectedDate={moment(selectedDate)}
        style={{ height: 100, width }}
        calendarHeaderStyle={{ color: "white" }}
        dateNumberStyle={{ color: "white", fontSize: 15, fontWeight: "900" }}
        dateNameStyle={{ color: "white", fontSize: 16, fontWeight: "900" }}
        highlightDateNumberStyle={{
          color: "white",
          borderBottomColor: "orange",
          borderBottomWidth: 4,
        }}
      />
      <View
        style={{ width: "100%", height: 2, backgroundColor: "white" }}
      ></View>
      <ScrollView
        style={styles.availableClassesContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <Text style={styles.sectionTitle}>Available Classes</Text>
          {classesToday && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {classesToday.map((gymClass, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleClassClick(gymClass);
                    setImageIndex(`image_${(index + 4) % 12}`);
                  }}
                >
                  <View
                    style={[
                      styles.cardContainer,
                      { opacity: isClassPast(gymClass.time) ? 0.5 : 1 },
                    ]}
                  >
                    <View style={styles.card}>
                      <Image
                        source={images[imageIndex]}
                        resizeMode="cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 8,
                          position: "absolute",
                        }}
                      ></Image>
                      <View style={styles.cardInfo}>
                        <Text style={styles.className}>
                          {gymClass.className}
                        </Text>
                        <Text style={styles.spaces}>
                          Spaces Available: {gymClass.spacesAvailable}
                        </Text>
                        <Button
                          mode="contained"
                          disabled={
                            gymClass.spacesAvailable === 0 ||
                            gymClass.members.includes(currentUserUid) ||
                            isClassPast(gymClass.time)
                          }
                          textColor="#000"
                          style={styles.button}
                          onPress={() =>
                            handleBookClass(gymClass.id, gymClass.workout)
                          }
                        >
                          Book Now
                        </Button>
                      </View>
                    </View>
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
        </View>
        <View style={styles.upcomingClassesView}>
          <Text style={styles.title}>Your Upcoming Classes</Text>
          {upcomingClasses && (
            <ScrollView showsVerticalScrollIndicator={false}>
              {upcomingClasses.map((gymClass, index) => (
                //only show classes that are not yesterday or before
                <View>
                  {moment(gymClass.date).isAfter(
                    moment().subtract(1, "days")
                  ) && (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleBookedClassClick(gymClass)}
                      style={{ width: "100%" }}
                    >
                      <View style={styles.upcomingClassCard}>
                        <Text
                          style={[
                            styles.className,
                            {
                              alignSelf: "center",
                              color: "white",
                              marginTop: 32,
                            },
                          ]}
                        >
                          {gymClass.className}
                        </Text>
                        <Text
                          style={[
                            styles.spaces,
                            { alignSelf: "center", color: "white" },
                          ]}
                        >
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
                  )}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        <Modal visible={selectedClass !== null} animationType="fade">
          <View style={styles.modalContainer}>
            <View
              style={{
                width: "100%",
                height: height * 0.3,
                backgroundColor: "#D9D9D9",
                justifyContent: "flex-end",
              }}
            >
              <Image
                source={images[imageIndex]}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  resizeMode: "cover",
                }}
              ></Image>

              <TouchableOpacity
                onPress={() => closeModal()}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 20,
                  height: 50,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/left.png")}
                  style={{
                    height: "80%",
                    width: 30,
                    position: "absolute",
                    resizeMode: "contain",
                  }}
                ></Image>
                <Text
                  style={{
                    position: "absolute",
                    left: 30,
                    height: "80%",
                    textAlignVertical: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
              <Text style={{ ...styles.modalHeader, alignSelf: "center" }}>
                {selectedClass?.className}
              </Text>
            </View>
            <Text style={styles.modalDescription}>
              {selectedClass?.description}
            </Text>
            {admin && (
              <View>
                <Text
                  style={{
                    ...styles.modalHeader,
                    color: "white",
                    alignSelf: "baseline",
                    paddingLeft: 24,
                    width,
                    marginBottom: 0,
                  }}
                >
                  Members booked in:
                </Text>

                {membersInClass && (
                  <View>
                    {membersInClass.map((member, index) => (
                      <Text
                        key={index}
                        style={{ ...styles.modalDescription, marginLeft: 24 }}
                      >
                        {member.name}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}

            {workout && (
              <ScrollView vertical showsHorizontalScrollIndicator={false}>
                <View>
                  <Text style={styles.modalHeader}>
                    Workout: {workout.name}
                  </Text>
                  <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <ExerciseBlock
                      exercises={workout.exercises}
                      bookedIn={bookedIn}
                      workoutId={workout._id}
                    />
                  </ScrollView>
                </View>
              </ScrollView>
            )}

            <Button
              textColor="white"
              contentStyle={{ fontSize: 1 }}
              onPress={() => closeModal()}
            >
              Close
            </Button>
          </View>
        </Modal>
      </ScrollView>
      {admin && (
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateClass")}
          style={{
            position: "absolute",
            right: 24,
            width: 60,
            height: 60,
            bottom: 20, // Adjust this value based on your preference
            borderRadius: 30,
            backgroundColor: "#2F2F2F",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // set background color to black
    paddingTop: 16,
  },
  datePickerContainer: {
    height: 65,
  },
  datePicker: {
    backgroundColor: "#111", // set background color to dark gray
    // borderRadius: 8,
    // marginRight: 16,
    width: width / 7,
  },
  selectedDate: {
    backgroundColor: "transparent", // set background color to blue
  },
  todayDate: {
    backgroundColor: "#111", // set background color to a darker gray
  },
  dateTextDate: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // set text color to white
    textAlign: "center",
  },
  dateTextWeekDay: {
    fontSize: 16,
    color: "#fff", // set text color to white
    textAlign: "center",
  },
  dateIndicator: {
    width: width / 7,
    height: 4,
    borderRadius: 2,
    backgroundColor: "orange", // set background color to white
    marginTop: 4,
    left: 0,
  },

  horizontalBar: {
    width: width,
    alignSelf: "center",
    height: 4,
    backgroundColor: "#fff", // set background color to white
  },
  availableClassesContainer: {
    backgroundColor: "#111", // set background color to dark gray
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    flex: 1,
  },
  upcomingClassesView: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // set text color to white
    marginBottom: 16,
  },
  cardContainer: {
    width: width * 0.7,
    height: height * 0.3,
  },
  card: {
    backgroundColor: "#222",
    borderRadius: 8,
    marginBottom: 16,
    width: "80%",
    height: height * 0.2,
    position: "absolute",
    left: "10%",
  },

  cardInfo: {
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    width: "80%",
    height: "70%",
    alignSelf: "center",
    marginTop: "30%",
  },

  excerciseCard: {
    backgroundColor: "#222", // set background color to dark gray
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  upcomingClassesScrollView: {
    flexGrow: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black", // set text color to white
    marginBottom: 8,
    alignSelf: "flex-start",
    paddingLeft: 8,
  },
  spaces: {
    fontSize: 14,
    color: "black", // set text color to white
    marginBottom: 16,
    alignSelf: "flex-start",
    paddingLeft: 8,
  },
  button: {
    marginTop: "auto",
    backgroundColor: "transparent",
    fontSize: 16,
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
  classScrollContainer: {
    flexGrow: 1,
  },
  classRow: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  upcomingClassCard: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#2F2F2F",
    borderRadius: 8,
    height: height * 0.2,
    alignSelf: "center",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222", // set background color to dark gray
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // set text color to white
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  modalDescription: {
    fontSize: 16,
    color: "#fff", // set text color to white
    marginBottom: 16,
    marginTop: 16,
  },
  closeButton: {
    marginTop: "auto",
    backgroundColor: "#D9D9D9",
    width: "100%",
    borderRadius: 8,
    height: 0,
  },
  exerciseBlock: {
    backgroundColor: "#444",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
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

export default GymClassesScreen;
