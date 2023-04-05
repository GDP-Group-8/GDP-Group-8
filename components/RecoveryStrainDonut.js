import React from "react";
import { View, Text, Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export const RecoveryStrainDonut = ({ recovery, strain }) => {
  const recoveryColor =
    recovery >= 67
      ? `rgba(105, 255, 63,`
      : recovery >= 34
      ? `rgba(255, 165, 0,`
      : `rgba(255, 0, 0,`;
  const strainColor = `rgba(0, 160, 255,`;

  const data = {
    labels: ["Recovery", "Strain"],
    data: [recovery / 100, strain / 21],
  };

  const chartConfig = {
    backgroundGradientFrom: "#111",
    backgroundGradientTo: "#111",
    color: (opacity = 1, index) => {
      if (index === 0) {
        return recoveryColor + opacity + ")";
      }
      if (index === 1) {
        return strainColor + opacity + ")";
      }
      return `rgba(255, 255, 255, ${opacity})`;
    },
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
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
        hideLegend={true}
        style={{ backgroundColor: "transparent" }}
      />
      <View
        style={{
          position: "absolute",
          top: "25%",
          left: "17.5%",
        }}
      >
        <Text style={{ fontSize: 14, color: "#fff", fontWeight: "600" }}>
          Strain
        </Text>
        <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
          {strain.toFixed(1)}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: "25%",
          right: "13%",
        }}
      >
        <Text style={{ fontSize: 14, color: "#fff", fontWeight: "600" }}>
          Recovery
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: recoveryColor + "1)",
            fontWeight: "bold",
          }}
        >
          {recovery}%
        </Text>
      </View>
    </View>
  );
};
