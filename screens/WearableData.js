import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecoveryStrainDonut } from "../components/RecoveryStrainDonut";
import { yourIp } from "../firebase";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
export const MyDataScreen = ({ navigation }) => {
  const [recovery, setRecovery] = useState(80);
  const [strain, setStrain] = useState(12);
  const [rhr, setRhr] = useState();
  const [hrv, setHrv] = useState();
  const { currentUser, admin, currentUserUid } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        yourIp + "/whoop/getData/" + currentUserUid
      );
      console.log(response.data.recovery);
      setStrain(response.data.cyclesToSend.score.strain);
      setRecovery(response.data.recovery.score.recovery_score);
      setRhr(response.data.recovery.score.resting_heart_rate);
      setHrv(response.data.recovery.score.hrv_rmssd_milli);
    };
    fetchData();
  }, []);

  //

  return <RecoveryStrainDonut recovery={recovery} strain={strain} />;
};
const styles = StyleSheet.create({
  scene: {
    flex: 1,
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
