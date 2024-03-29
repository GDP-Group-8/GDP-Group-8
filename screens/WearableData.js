import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { RecoveryStrainDonut } from "../components/RecoveryStrainDonut";
import { yourIp } from "../firebase";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { WhoopLineChart } from "../components/WhoopLineChart";
import { Picker } from "@react-native-picker/picker";
import { GoogleFitBarChart } from "../components/GoogleFitBarChart";
import { GoogleFitKmBarChart } from "../components/GoogleFitKmBarChart";
export const MyDataScreen = ({ navigation }) => {
  const [recovery, setRecovery] = useState(80);
  const [strain, setStrain] = useState(12);
  const [rhr, setRhr] = useState();
  const [hrv, setHrv] = useState();
  const [avgHeartRate, setAvgHeartRate] = useState();
  const [avgHrv, setAvgHrv] = useState();
  const [sleepPerformance, setSleepPerformance] = useState();
  const [respiratoryRate, setRespiratoryRate] = useState();
  const { currentUser, admin, currentUserUid } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState([]);
  const [googleFitData, setGoogleFitData] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState("");
  const [whoopDataIsTrue, setWhoopDataIsTrue] = useState(true);
  const [googleFitDataIsTrue, setGoogleFitDataIsTrue] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isAnyDataAvailable, setIsAnyDataAvailable] = useState(false);
  const [todaysFootsteps, setTodaysFootsteps] = useState(0);
  const [todaysKmsMoved, setTodaysKmsMoved] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        yourIp + "/whoop/getData/" + currentUserUid
      );
      setDailyData(response.data.sevenDayData.dailyData);
      setIsAnyDataAvailable(true);
      setStrain(response.data.cyclesToSend.score.strain);
      setRecovery(response.data.recovery.score.recovery_score);
      setRhr(response.data.recovery.score.resting_heart_rate);
      setHrv(response.data.recovery.score.hrv_rmssd_milli.toFixed(0));
      setSleepPerformance(
        response.data.sleep.score.sleep_performance_percentage
      );
      setRespiratoryRate(response.data.sleep.score.respiratory_rate.toFixed(1));
      setAvgHeartRate(response.data.sevenDayData.averageRHR.toFixed(0));
      setAvgHrv(response.data.sevenDayData.averageHRV.toFixed(0));
      setWhoopDataIsTrue(true);
    } catch (error) {
      setWhoopDataIsTrue(false);
      console.log(error);
    }
    setLoading(false); // Set loading to false here    setLoading(false);
  }, [currentUserUid]);

  const fetchGoogleFitData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        yourIp + "/googleFit/google-fit-data/" + currentUserUid
      );
      setGoogleFitData(response.data);
      setIsAnyDataAvailable(true);
      setGoogleFitDataIsTrue(true);
      //get today date in yyyy-mm-dd format. 2023-1-1 remove the zero from the month and day if it is less than 10
      // const todayDate = new Date().toISOString().slice(0, 10);
      //remove the zero from the month and day if it is less than 10
      const todayDate =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      if (response.data) {
        if (response.data["com.google.step_count.delta"][todayDate]) {
          setTodaysFootsteps(
            response.data["com.google.step_count.delta"][todayDate].steps
          );
        }
        if (response.data["com.google.distance.delta"][todayDate]) {
          setTodaysKmsMoved(
            response.data["com.google.distance.delta"][todayDate].value / 1000
          );
        }
      } else {
        setGoogleFitDataIsTrue(false);
      }
    } catch (error) {
      setGoogleFitDataIsTrue(false);
      console.log(error);
    }
    setLoading(false);
  }, [currentUserUid]);

  useEffect(() => {
    fetchData();
    fetchGoogleFitData();
  }, [fetchData, fetchGoogleFitData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const InfoCard = ({ title, value, unit, iconName, average, isRhr }) => (
    <View style={styles.infoCard}>
      <FontAwesome5
        name={iconName}
        size={24}
        color="#fff"
        style={styles.infoCardIcon}
      />
      <Text style={styles.infoCardTitle}>{title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.infoCardValue}>
          {value} {unit}
        </Text>
        {average && (
          <View style={styles.arrowContainer}>
            <FontAwesome5
              name={
                (isRhr === true && value > average) ||
                (isRhr === false && value > average)
                  ? "arrow-up"
                  : "arrow-down"
              }
              size={12}
              color={
                (isRhr && value > average) || (!isRhr && value < average)
                  ? "red"
                  : "green"
              }
              style={styles.arrowIcon}
            />
            <Text style={styles.averageValue}>Avg: {average}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <ActivityIndicator size="large" color="orange" style={styles.loading} />
      ) : isAnyDataAvailable ? (
        <>
          <Picker
            selectedValue={selectedDataSource}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => setSelectedDataSource(itemValue)}
          >
            {googleFitDataIsTrue && (
              <Picker.Item label="Google Fit" value="googleFit" />
            )}
            {whoopDataIsTrue && <Picker.Item label="Whoop" value="whoop" />}
          </Picker>

          {selectedDataSource === "whoop" && whoopDataIsTrue ? (
            <View>
              <View style={styles.donutContainer}>
                <RecoveryStrainDonut recovery={recovery} strain={strain} />
              </View>
              <View style={styles.infoCards}>
                <InfoCard
                  title="Resting Heart Rate"
                  value={rhr}
                  unit="bpm"
                  iconName="heart"
                  average={avgHeartRate}
                  isRhr={true}
                />
                <InfoCard
                  title="Heart Rate Variability"
                  value={hrv}
                  unit="ms"
                  iconName="heartbeat"
                  average={avgHrv}
                  isRhr={false}
                />
              </View>
              <View style={styles.infoCards}>
                <InfoCard
                  title="Sleep Performance"
                  value={sleepPerformance}
                  unit="%"
                  iconName="moon"
                />
                <InfoCard
                  title="Respiratory Rate"
                  value={respiratoryRate}
                  unit="br/min"
                  iconName="lungs"
                />
              </View>
              <WhoopLineChart sevenDayData={dailyData} />
            </View>
          ) : (
            <View>
              <View style={styles.infoCards}>
                <InfoCard
                  title="Today's Footsteps"
                  value={todaysFootsteps}
                  unit="steps"
                  iconName="shoe-prints"
                />
                <InfoCard
                  title="Today's Kms Moved"
                  value={todaysKmsMoved.toFixed(2)}
                  unit="km"
                  iconName="route"
                />
              </View>
              {googleFitData["com.google.step_count.delta"] && (
                <GoogleFitBarChart data={googleFitData} />
              )}
              {googleFitData["com.google.distance.delta"] && (
                <GoogleFitKmBarChart data={googleFitData} />
              )}
            </View>
          )}
        </>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            No external data has been linked to the app. Please link your data
            in the settings.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#FFF",
    backgroundColor: "#222",
    marginBottom: 16,
  },
  pickerItem: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 16,
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

  infoCard: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "48%",
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
