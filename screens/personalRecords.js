// import React, { useState, useEffect } from "react";
// import { View, ScrollView, TextInput } from "react-native";
// import { Text, Divider, List, Headline, Button } from "react-native-paper";
// import { useAuth } from "../contexts/AuthContext";
// export default function PersonalRecords({ navigation }) {
//   const { currentUser, admin } = useAuth();
//   useEffect(() => {
//     if (!currentUser) {
//       navigation.navigate("HomeScreen");
//     }
//     // fetchExercises();
//   }, [currentUser]);

//   return (
//     <View className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//       <Headline style={{ textAlign: "center" }}>My Lifts</Headline>
//       <View className="flex flex-row mt-5"></View>
//     </View>
//   );
// }
import { yourIp } from "../firebase";
import React, { useState, useEffect, useRef } from "react";
import {  View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Headline, Appbar } from "react-native-paper";

import { Camera } from "expo-camera";
import { uploadVideo } from "../firebase";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
export default function PersonalRecords({ navigation,route }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  let camera = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const [microphoneStatus, setMicrophoneStatus] = useState(null);
  const [video, setVideo] = useState(null);
  // const { currentUser, admin } = useAuth();
  
  const newExercise = route.params.newExercise;
  const setNewExercise = route.params.setNewExercise;

  useEffect(() => {
    //everytime the component is rendered, it will request permission
    const unsubscribe = navigation.addListener("focus", () => {
      (async () => {
        //request camera permission not using requestPermissionsAsync
        const status = await Camera.requestCameraPermissionsAsync();
        const microphoneStatus =
          await Camera.requestMicrophonePermissionsAsync();
        setCameraPermission(status.status === "granted");
        setMicrophoneStatus(microphoneStatus.status === "granted");
      })();
    });
    return unsubscribe;
  }, []);

  if (cameraPermission === null) {
    return <View />;
  }
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      let options = {
        quality: Camera.Constants.VideoQuality["1080p"],
        maxDuration: 60,
      };
      camera.current.recordAsync(options).then(async (recordedVideo) => {
        setVideo(recordedVideo);
        console.log("Video recorded");
        const response = await fetch(recordedVideo.uri);
        const blob = await response.blob();
        // Upload the video to Firebase
        const uploadTaskPath = await uploadVideo(blob);
        // Get the download URL
        console.log(uploadTaskPath);

        setNewExercise({...newExercise,demo:uploadTaskPath});

        
      });
    }
  };
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "rgb(47,47,47)" }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          color={"white"}
        />
        <Appbar.Content
          titleStyle={{ fontWeight: "bold", color: "white" }}
          title="Record Video"
        />
      </Appbar.Header>
      <Camera style={styles.camera} ref={camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleRecord} style={styles.button}>
            <Text style={styles.text}>{isRecording ? "Stop" : "Record"}</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
});
