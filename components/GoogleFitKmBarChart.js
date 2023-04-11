import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import React from "react";
import { View, Text, StyleSheet } from "react-native";
export const GoogleFitKmBarChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data["com.google.distance.delta"]).map((date) =>
      date.slice(5)
    ),
    datasets: [
      {
        data: Object.entries(data["com.google.distance.delta"]).map(
          ([date, { value }]) => value / 1000 || 0
        ),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#222",
    backgroundGradientTo: "#222",
    color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`, // Orange color
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Distance Moved (km)</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={chartConfig}
        style={styles.barChart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  barChart: {
    borderRadius: 16,
  },
});
