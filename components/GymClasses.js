import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useRef } from "react";

import GymClassNavItem from "./GymClassNavItem";
import Placeholder from "./Placeholder";
import { NULL_OBJECT } from "../constants";

const GymClasses = ({ classData }) => {
  const [scrollOffset, setScrollOffset] = useState(0);

  const startXRef = useRef(0);

  const handleScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };

  const handleSwipe = (distance) => {
    const threshold = 50; // minimum swipe distance to trigger navigation

    if (distance > threshold && scrollOffset < width * 2) {
      // swipe left
      const newOffset = scrollOffset + width;
      this.scrollView.scrollTo({ x: newOffset, y: 0, animated: true });
      setScrollOffset(newOffset);
    } else if (distance < -threshold && scrollOffset > 0) {
      // swipe right
      const newOffset = scrollOffset - width;
      this.scrollView.scrollTo({ x: newOffset, y: 0, animated: true });
      setScrollOffset(newOffset);
    }
  };

  return (
    <View style={styles.gymContainer}>
      <View style={{ margin: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Upcoming</Text>
      </View>
      <View style={styles.classNav}>
        {Object.is(classData, NULL_OBJECT) || !Array.isArray(classData) ? (
          <Placeholder />
        ) : classData.length === 0 ? (
          <Text style={styles.noClasses}>No Classes Today</Text>
        ) : (
          <View
            style={{
              ...styles.scrollContainer,
              position: "absolute",
              top: "10%",
            }}
            onTouchStart={(event) => {
              startXRef.current = event.nativeEvent.locationX;
            }}
            onTouchEnd={(event) =>
              handleSwipe(event.nativeEvent.locationX - startXRef.current)
            }
          >
            <ScrollView
              contentContainerStyle={{
                ...styles.scrollContainer,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {classData.map((classData, i) => {
                return <GymClassNavItem key={i} {...classData} />;
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gymContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
  },

  noClasses: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    fontSize: 28,
    fontWeight: "bolder",
    color: "white",
  },

  scrollContainer: {
    width: "100%",
    height: "100%",
  },

  classNav: {
    paddingLeft: 16,
    marginTop: 32,
    display: "flex",
    flexWrap: "nowrap",
    position: "absolute",
    width: "100%",
    height: "30%",
    flexDirection: "row",
    alignItems: "center",
  },
  upcomingText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GymClasses;
