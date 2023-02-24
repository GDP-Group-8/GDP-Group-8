import { StyleSheet, View, Animated } from "react-native";
import React, { useRef, useState } from "react";
import { times } from "./util";

const animate = (
  animatedValue,
  toValue,
  duration,
  useNativeDriver,
  initialDelay
) => {
  Animated.timing(animatedValue, {
    toValue,
    duration,
    useNativeDriver,
    delay: initialDelay,
  }).start(() =>
    animate(animatedValue, toValue === 0 ? 1 : 0, duration, useNativeDriver, 0)
  );
};
const PlaceHolder = () => {
  const bgAnimation0 = useRef(new Animated.Value(0)).current;
  const bgAnimation1 = useRef(new Animated.Value(0)).current;
  const [height, setHeight] = useState(0);
  animate(bgAnimation0, 1, 1200, false, 0);
  animate(bgAnimation1, 1, 1200, false, 300);

  const backgroundColor0 = bgAnimation0.interpolate({
    inputRange: [0, 1],
    outputRange: ["#141414", "gray"],
  });

  const backgroundColor1 = bgAnimation1.interpolate({
    inputRange: [0, 1],
    outputRange: ["#141414", "gray"],
  });

  const onLayout = (e) => {
    if (!e.nativeEvent.layout) return;
    setHeight(e.nativeEvent.layout.height);
  };

  return times(2, (i) => {
    return (
      <View
        key={i}
        style={{ ...styles.placeholderContainer, marginLeft: i === 0 ? 0 : 8 }}
      >
        <Animated.View
          style={{
            ...styles.placeholderChild0,
            backgroundColor: backgroundColor0,
          }}
        ></Animated.View>
        <Animated.View
          onLayout={onLayout}
          style={{
            ...styles.placeholderChild1,
            backgroundColor: backgroundColor1,
            transform: [{ translateY: height * 0.25 }],
          }}
        ></Animated.View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  placeholderContainer: {
    height: "80%",
    width: "85%",
    borderRadius: 10,
    position: "relative",
    marginTop: 0,
    marginBottom: 0,
    marginRight: 8,
    backgroundColor: "blue",
  },
  placeholderChild0: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
  },

  placeholderChild1: {
    width: "80%",
    position: "absolute",
    height: "70%",
    borderRadius: 10,
    left: "10%",
    bottom: 0,
    transform: [{ translateY: 0.25 }],
  },
});

export default PlaceHolder;
