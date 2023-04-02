import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export const MyRecordsScreen = ({ navigation }) => {
  return (
    <View style={[styles.scene]}>{/* Your My Records screen content */}</View>
  );
};
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "#111",
  },
  safeArea: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#FFF", // Adjust the background color of the tab bar
  },
  label: {
    color: "#000", // Adjust the color of the tab labels
  },
  indicator: {
    backgroundColor: "#000", // Adjust the color of the active tab indicator
  },
});
