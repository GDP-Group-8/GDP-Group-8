// import React from "react";
// import { View, Text } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import { Dimensions } from "react-native";

// const screenWidth = Dimensions.get("window").width;

// const chartConfig = {
//   backgroundGradientFrom: "#1E2923",
//   backgroundGradientTo: "#08130D",
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//   strokeWidth: 2,
//   secondYAxis: {
//     enabled: true,
//     label: "Strain",
//     minValue: 0,
//     maxValue: 25,
//     interval: 5,
//     decimalPlaces: 1,
//     labelColor: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
//   },
// };
// const getWeekdayLabel = (daysAgo) => {
//   const day = new Date();
//   day.setDate(day.getDate() - daysAgo);
//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   return weekdays[day.getDay()];
// };
// export const WhoopLineChart = ({ sevenDayData }) => {
//   const reversedData = [...sevenDayData].reverse();

//   const recoveryData = sevenDayData.map((data) => data.recovery);
//   const strainData = sevenDayData.map((data) => data.strain);

//   return (
//     <View>
//       <Text>7 Day Data</Text>
//       <LineChart
//         data={{
//           labels: reversedData.map((_, index) => getWeekdayLabel(6 - index)),
//           datasets: [
//             {
//               data: recoveryData.reverse(),
//               color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
//               strokeWidth: 2,
//             },
//             {
//               data: strainData.reverse(),
//               color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
//               strokeWidth: 2,
//               yAxisDependency: "right",
//             },
//           ],
//         }}
//         width={screenWidth - 32}
//         height={220}
//         chartConfig={chartConfig}
//         bezier
//       />
//     </View>
//   );
// };
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Circle } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import { Svg, Text as Text2 } from "react-native-svg";
const screenWidth = Dimensions.get("window").width;
const getWeekdayLabel = (daysAgo) => {
  const day = new Date();
  day.setDate(day.getDate() - daysAgo);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[day.getDay()];
};

const recoveryLabels = [
  { value: 100, color: "green" },
  { value: 66, color: "yellow" },
  { value: 33, color: "red" },
  { value: 0, color: "red" },
];

const strainLabels = [
  { value: 21, color: "rgba(0, 160, 255,1)" },
  { value: 14, color: "rgba(0, 160, 255,1)" },
  { value: 7, color: "rgba(0, 160, 255,1)" },
  { value: 0, color: "rgba(0, 160, 255,1)" },
];

export const WhoopLineChart = ({ sevenDayData }) => {
  const totalHeight = 180;
  const reversedData = [...sevenDayData].reverse();
  const recoveryData = reversedData.map((data) => data.recovery);
  const strainData = reversedData.map((data) => data.strain);
  const x = scaleLinear()
    .domain([0, reversedData.length - 1])
    .range([20, screenWidth - 80]);

  const y1 = scaleLinear().domain([0, 100]).range([totalHeight, 20]);

  const y2 = scaleLinear().domain([0, 21]).range([totalHeight, 30]);

  const RecoveryLabelDecorator = ({ x, y }) => {
    return recoveryData.map((value, index) => (
      <Text2
        key={index}
        x={x(index)}
        y={y(value) - 10}
        fontSize="10"
        fontWeight="bold"
        fill={getRecoveryLabelColor(value)}
        textAnchor="middle"
      >
        {value}
      </Text2>
    ));
  };
  const getRecoveryLabelColor = (value) => {
    if (value >= 67) {
      return "green";
    } else if (value >= 34) {
      return "yellow";
    } else {
      return "red";
    }
  };
  const StrainLabelDecorator = ({ x, y }) => {
    return strainData.map((value, index) => (
      <Text2
        key={index}
        x={x(index)}
        y={y(value) - 10}
        fontSize="10"
        fontWeight="bold"
        fill="rgba(0, 160, 255,1)"
        textAnchor="middle"
      >
        {value.toFixed(1)}
      </Text2>
    ));
  };
  const renderRecoveryLabels = () => {
    const yOffset = totalHeight / 4;
    const labels = [
      { value: 100, color: "green" },
      { value: 66, color: "yellow" },
      { value: 33, color: "red" },
      { value: 0, color: "red" },
    ];

    return labels.map((label, index) => (
      <Text2
        key={label.value}
        fill={label.color}
        x="15"
        y={yOffset * index + 10}
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
      >
        {label.value}
      </Text2>
    ));
  };

  const renderStrainLabels = () => {
    const yOffset = totalHeight / 4;
    const labels = [
      { value: 21, color: "rgba(0, 160, 255,1)" },
      { value: 14, color: "rgba(0, 160, 255,1)" },
      { value: 7, color: "rgba(0, 160, 255,1)" },
      { value: 0, color: "rgba(0, 160, 255,1)" },
    ];

    return labels.map((label, index) => (
      <Text2
        key={label.value}
        fill={label.color}
        x="15"
        y={yOffset * index + 10}
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
      >
        {label.value}
      </Text2>
    ));
  };
  return (
    <View>
      {/* center a text element */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Strain & Recovery
      </Text>
      <View style={{ flexDirection: "row", height: 200, padding: 10 }}>
        <View style={{ height: totalHeight - 100 }}>
          <Svg height={totalHeight} width="25">
            {renderRecoveryLabels()}
          </Svg>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={recoveryData}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ stroke: "grey" }}
            curve={shape.curveLinear}
          />
          <LineChart
            style={{
              flex: 1,
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            data={strainData}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ stroke: "rgba(0, 160, 255,1)" }}
            curve={shape.curveLinear}
            yMax={21}
            yMin={0}
          />
          <Svg
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <RecoveryLabelDecorator x={x} y={y1} />
            <StrainLabelDecorator x={x} y={y2} />
          </Svg>
          <XAxis
            style={{ marginHorizontal: -10, height: 20 }}
            data={reversedData}
            formatLabel={(value, index) => getWeekdayLabel(6 - index)}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: "white" }}
          />
        </View>
        <View style={{ height: totalHeight }}>
          <Svg height={totalHeight} width="30">
            {renderStrainLabels()}
          </Svg>
        </View>
      </View>
    </View>
  );
};
