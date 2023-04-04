import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  LineChart
} from "react-native-chart-kit";
import { Text, Divider, List, Headline, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { useAuth } from "../contexts/AuthContext";


const Table = ({ records }) => (
  <View style={styles.mainGraph}>
    <Text style={styles.infoCardValue}>{records[0].exercise}</Text>
    <View style={styles.valueContainer}>
      {records.map(record => (
        <Text style={styles.infoCardTitle}>
          {record.date} : {record.weight} kg
        </Text>
      ))}
    </View>
  </View>
);

export const MyRecordsScreen = ({ navigation }) => {

  const screenWidth = (Dimensions.get("window").width) - (Dimensions.get("window").width)/13;
  const { currentUser, admin } = useAuth();
  //const [records, setRecords] = React.useState([]);
  const exercise = "Squat";

  const records = [
    {
      memberID: "123",
      exercise: "Squat",
      date: "03/02/23",
      weight: 64
    },
    {
      memberID: "123",
      exercise: "Squat",
      date: "07/02/23",
      weight: 70
    },
    {
      memberID: "123",
      exercise: "Squat",
      date: "13/02/23",
      weight: 90
    },
  ]

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
    fetchRecords();
  }, [currentUser]);

  async function fetchRecords(exercise) {
    // const response = await fetch(`https://gdp-api.herokuapp.com/records/${currentUser.uid}/${exercise}`);
    // const data = await response.json();
    // setRecords(data);
  }

  return (
    <View style={styles.container}>
      <View className="">
        <Text style={styles.mainGraph}>Excercise: Squat</Text>
          <LineChart
            class="w-100 p-3"
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={screenWidth} // from react-native
            height={220}
            yAxisSuffix="kg"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#111",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
      </View>
      <View>
        <Table 
         records={records}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 16,
  },
  donutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  donutData: {
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
  },
  infoCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  infoCardIcon: {
    position: "absolute",
    top: 10,
    right: 5,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
  },
  arrowIcon: {
    marginRight: 4,
  },
  averageValue: {
    fontSize: 12,
    color: "#fff",
  },
  averageContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 5,
  },

  mainGraph: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    color: "#fff"
  },
  mainCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  infoCardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  scene: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#111",
  },
  label: {
    color: "#fff",
  },
  indicator: {
    backgroundColor: "orange",
  },
});

