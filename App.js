import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getDDMMYYYY } from "./util";

import data from "./data";
import Navbar from "./Navbar";
import GymClasses from "./GymClasses";
import { NULL_OBJECT } from "./constants";

const App = () => {
  const [dateString, setDateString] = useState(getDDMMYYYY(new Date()));
  const [classData, setClassData] = useState(NULL_OBJECT);

  useEffect(() => {
    // api request to get class data for the date selected
    setTimeout(() => {
      setClassData(data[dateString] || []);
    }, 1000);
  }, [dateString]);

  return (
    <View style={styles.container}>
      <Navbar setClassData={setClassData} setDateString={setDateString} />
      <View style={styles.body}>
        <GymClasses classData={classData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  body: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "85%",
    fontFamily: "Roboto",
    backgroundColor: "black",
  },
});

export default App;
