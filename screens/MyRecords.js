import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Modal, FlatList } from 'react-native';
import {
  LineChart
} from "react-native-chart-kit";
import { Text, Divider, List, Headline, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

const PillList = ({ data, onSelect }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onSelect(item)} style={styles.pillContainer}>
        <Text style={styles.pillText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
    />
  );
};

const Table = ({ records }) => (
  <View style={styles.mainGraph}>
    <Text style={styles.infoCardValue}>{records[0].exercise}</Text>
    <View style={styles.valueContainer}>
      {records.map(record => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}> 
          <Text style={styles.infoCardTitle}>{record.date}</Text>
          <Text style={styles.infoCardTitle}>{record.weight} kg</Text>
        </View>
      ))}
    </View>
  </View>
);


export const MyRecordsScreen = ({ navigation }) => {

  const screenWidth = (Dimensions.get("window").width) - (Dimensions.get("window").width)/13;
  const { currentUser, admin } = useAuth();
  //const [records, setRecords] = useState([]);
  const [exercise, setExercise] = useState("Squat");
  const exercises = ["Squat", "Bench", "Overhead Press", "Bicep Curls"];
  const [modalVisible, setModalVisible] = useState(false);
  
  const handlePillSelect = (pill) => {
    setExercise(pill);
  };

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
    //fetchRecords();
  }, [currentUser, exercise]);

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
  // async function fetchRecords() {
  //   // const response = await fetch(`https://gdp-api.herokuapp.com/records/${currentUser.uid}/${exercise}`);
  //   // const data = await response.json();
  //   // setRecords(data);
  //   // for demo purposes, setting static data
  //   setRecords([
  //     {
  //       memberID: "123",
  //       exercise: "Squat",
  //       date: "03/02/23",
  //       weight: 64
  //     },
  //     {
  //       memberID: "123",
  //       exercise: "Squat",
  //       date: "07/02/23",
  //       weight: 70
  //     },
  //     {
  //       memberID: "123",
  //       exercise: "Squat",
  //       date: "13/02/23",
  //       weight: 90
  //     },
  //   ]);
  // }


  return (
    <View style={styles.container}>
      <View>
      <PillList data={exercises} onSelect={handlePillSelect} />
        <Text style={styles.mainGraph}>Exercise: {exercise}</Text>
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
  pillContainer: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
  },
  pillText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
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
    flexDirection: "column",
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

