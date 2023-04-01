import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart, ProgressCircle } from "react-native-svg-charts";
import { ProgressChart } from "react-native-chart-kit";
import { Circle, G, Line } from "react-native-svg";
const screenWidth = Dimensions.get("window").width;

export const RecoveryStrainDonut = ({ recovery, strain }) => {
  const recoveryColor =
    recovery >= 66
      ? `rgba(105, 255, 63,`
      : recovery >= 33
      ? `rgba(255, 165, 0,`
      : `rgba(255, 0, 0,`;
  const strainColor = `rgba(0, 0, ${(strain / 21) * 255},`;

  const data = {
    labels: ["Recovery", "Strain"],
    data: [recovery / 100, strain / 21],
    barColors: [recoveryColor, strainColor],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1, index) => {
      if (index === 0) {
        return recoveryColor + opacity + ")";
      }
      if (index === 1) {
        return strainColor + opacity + ")";
      }
      return `rgba(0, 0, 0, ${opacity})`;
    },

    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        style={{ backgroundColor: "transparent" }}
      />
    </View>
  );
};
