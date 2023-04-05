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
  const [selectedDataSource, setSelectedDataSource] = useState("whoop");

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(
      yourIp + "/whoop/getData/" + currentUserUid
    );
    console.log(response.data.sevenDayData.dailyData);
    setDailyData(response.data.sevenDayData.dailyData);
    setStrain(response.data.cyclesToSend.score.strain);
    setRecovery(response.data.recovery.score.recovery_score);
    setRhr(response.data.recovery.score.resting_heart_rate);
    setHrv(response.data.recovery.score.hrv_rmssd_milli.toFixed(0));
    setSleepPerformance(response.data.sleep.score.sleep_performance_percentage);
    setRespiratoryRate(response.data.sleep.score.respiratory_rate.toFixed(1));
    setAvgHeartRate(response.data.sevenDayData.averageRHR.toFixed(0));
    setAvgHrv(response.data.sevenDayData.averageHRV.toFixed(0));
    setLoading(false); // Set loading to false here    setLoading(false);
  }, [currentUserUid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                (isRhr && value > average) || (!isRhr && value > average)
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
      ) : (
        <>
          <Picker
            selectedValue={selectedDataSource}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => setSelectedDataSource(itemValue)}
          >
            <Picker.Item label="Whoop" value="whoop" />
            <Picker.Item label="Google Fit" value="googleFit" />
          </Picker>

          {selectedDataSource === "whoop" ? (
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
                  isRhr
                />
                <InfoCard
                  title="Heart Rate Variability"
                  value={hrv}
                  unit="ms"
                  iconName="heartbeat"
                  average={avgHrv}
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
            <Text>Display Google Fit data here</Text>
          )}
        </>
      )}
    </ScrollView>
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
