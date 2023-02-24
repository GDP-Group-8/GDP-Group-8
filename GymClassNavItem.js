import { StyleSheet, Text, View, ImageBackground } from "react-native";

import React, { useState } from "react";

const GymClassNavItem = ({
  excersize,
  time,
  capacity,
  heroImage,
  availableSpaces,
}) => {
  const [height, setHeight] = useState(0);
  const onLayout = (e) => {
    if (!e.nativeEvent.layout) return;
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <View style={{ ...styles.bg }}>
      <ImageBackground
        source={require("./assets/hero_image.jpg")}
        style={{ ...styles.heroImage }}
      ></ImageBackground>

      <View
        style={{
          ...styles.textbox,
          transform: [{ translateY: height * 0.25 }],
        }}
        onLayout={onLayout}
      >
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.excersize}>{excersize}</Text>
        <Text style={styles.capacity}>Capacity: {capacity}</Text>
        <Text style={styles.availability}>
          {availableSpaces} Available Spaces
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    height: "80%",
    width: "85%",
    borderRadius: 10,
    position: "relative",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 8,
    marginRight: 8,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url("./hero_image.jpg")`,
  },

  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
  },

  textbox: {
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    left: "10%",
    width: "80%",
    height: "70%",
    backgroundColor: "#d9d9d9",
    paddingLeft: 16,
    paddingTop: 8,
  },

  textboxes: {},
  time: {
    fontWeight: "bolder",
    margin: 0,
    padding: 0,
    height: 20,
    display: "flex",
    alignItems: "center",
  },
  excersize: { fontSize: 32, height: 40 },
  capacity: {},
  availability: {},
});

export default GymClassNavItem;
