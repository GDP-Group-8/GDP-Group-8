import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import {
  getEvent,
  isTouchEvent,
  isPinching,
  times,
  translate,
  getThisWeekDates,
  getDDMMYYYY,
  getDay,
  getRandomColor,
} from "../util";
import {
  WEEK_IN_MILLISECONDS,
  DAY_IN_MILLISECONDS,
  NULL_OBJECT,
  DAYS_OF_THE_WEEK,
} from "../constants";

const Navbar = ({ setClassData, setDateString }) => {
  const [curr, setCurr] = useState(getDay());
  const left = useRef(new Animated.Value((curr / 7) * 100)).current;
  const swiperPosRef = useRef({
    x: 0,
    y: 0,
  });
  const swiperRef = useRef(null);
  const currTime = +new Date();
  const dateRefs = useRef(
    [
      currTime - WEEK_IN_MILLISECONDS,
      currTime,
      currTime + WEEK_IN_MILLISECONDS,
    ].map((d) => new Date(d))
  );
  const dateWeeks = dateRefs.current.map(getThisWeekDates);
  const onLayout = (e) => {
    if (!e.nativeEvent.layout) return;
    const { x, y } = e.nativeEvent.layout;
    swiperPosRef.current = { x, y };
  };

  const onMeasure = () => {
    if (!swiperRef.current) return;
    swiperRef.current.measure((x, y, width, height, pageX, pageY) => {
      swiperPosRef.current = { x: pageX, y: pageY };
    });
  };

  const screenWidth = Dimensions.get("window").width;

  const interpolatedLeft = left.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  const animateLeft = (toValue) => {
    Animated.timing(left, {
      toValue: (toValue / 7) * 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        onMeasure();
        const {
          current: { x, y },
        } = swiperPosRef;
        if (x > 0) {
          gesture.dx = gesture.dx - (x + screenWidth);
          dateRefs.current = dateRefs.current.map(
            (d) => new Date(+d - WEEK_IN_MILLISECONDS)
          );
        } else if (x < -screenWidth * 2) {
          gesture.dx = gesture.dx - (x + screenWidth);
        }
        Animated.event([null, { dx: pan.x }], {
          useNativeDriver: false,
        })(event, gesture);
      },
      onPanResponderRelease: (event, gesture) => {
        const MAX_SPEED = 0.33;
        const speed = gesture.vx;
        if (speed > MAX_SPEED) {
          Animated.spring(pan, {
            toValue: { x: screenWidth, y: 0 },
            useNativeDriver: false,
          }).start(() => {
            dateRefs.current = dateRefs.current.map(
              (d) => new Date(+d - WEEK_IN_MILLISECONDS)
            );
            Animated.event([null, { dx: pan.x }], {
              useNativeDriver: false,
            })(event, { dx: 0 });
            const day = getDay(dateRefs.current[1]);
            const dateStr = getDDMMYYYY(
              new Date(
                +dateRefs.current[1] + (day - curr) * DAY_IN_MILLISECONDS
              )
            );
            setClassData({ ...NULL_OBJECT });
            setDateString(dateStr);
          });
        } else if (speed < -MAX_SPEED) {
          Animated.spring(pan, {
            toValue: { x: -screenWidth, y: 0 },
            useNativeDriver: false,
          }).start(() => {
            dateRefs.current = dateRefs.current.map(
              (d) => new Date(+d + WEEK_IN_MILLISECONDS)
            );
            Animated.event([null, { dx: pan.x }], {
              useNativeDriver: false,
            })(event, { dx: 0 });
            const day = getDay(dateRefs.current[1]);
            const dateStr = getDDMMYYYY(
              new Date(
                +dateRefs.current[1] + (day - curr) * DAY_IN_MILLISECONDS
              )
            );
            setClassData({ ...NULL_OBJECT });
            setDateString(dateStr);
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.navbar}>
      <Animated.View
        ref={swiperRef}
        onLayout={onLayout}
        style={{
          ...styles.dateSlider,
          transform: [{ translateX: pan.x }],
        }}
        {...panResponder.panHandlers}
      >
        {times(3, (i) => {
          return (
            <View
              key={i}
              style={{
                ...styles.dateSliderItem,
                left: `${i * (100 / 3)}%`,
              }}
            >
              <View style={{ ...styles.dateContainer }}>
                {dateWeeks[i].map((date, j) => {
                  return (
                    <TouchableOpacity
                      key={j}
                      onPress={() => {
                        setCurr(j);
                        animateLeft(j);
                        const day = getDay(dateRefs.current[i]);
                        const dateStr = getDDMMYYYY(
                          new Date(
                            +dateRefs.current[i] +
                              (j - day) * DAY_IN_MILLISECONDS
                          )
                        );
                        setClassData({ ...NULL_OBJECT });
                        setDateString(dateStr);
                      }}
                      style={{ ...styles.date }}
                    >
                      <Text style={styles.dateText}>{date}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </Animated.View>
      <View style={styles.dayContainer}>
        {DAYS_OF_THE_WEEK.map((day, i) => {
          return (
            <View
              style={{
                ...styles.day,
                // backgroundColor: getRandomColor(),
                left: `${(i / 7) * 100}%`,
              }}
              key={i}
            >
              <Text style={styles.dayText}>{day}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.sliderContainer}>
        <Animated.View style={[styles.slider, { left: interpolatedLeft }]} />
      </View>
      <View style={styles.underline}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: "15%",
    position: "relative",
  },

  dateSlider: {
    position: "absolute",
    height: 40,
    bottom: 28,
    width: "300%",
    left: "-100%",
    display: "flex",
    flexDirection: "row",
  },

  dateSliderItem: {
    width: `${100 / 3}%`,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
  },

  dateContainer: {
    width: "92%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },

  date: {
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  dateText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  dayContainer: {
    width: "92%",
    position: "absolute",
    bottom: 8,
    left: "4%",
    height: 20,
  },

  day: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "14.28%",
    position: "absolute",
    top: 0,
  },

  dayText: {
    color: "white",
    fontSize: 12,
  },

  sliderContainer: {
    height: 4,
    width: "92%",
    position: "absolute",
    bottom: 4,
    left: "4%",
  },

  slider: {
    height: "100%",
    width: "14.28%",
    backgroundColor: "orange",
    top: 0,
    position: "absolute",
  },

  underline: {
    height: 4,
    width: "92%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: "4%",
  },
});

export default Navbar;
