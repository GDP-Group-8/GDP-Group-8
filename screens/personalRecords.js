import { yourIp } from "../firebase";
import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Headline, Appbar } from "react-native-paper";

import { Camera } from "expo-camera";

export default function PersonalRecords({ navigation, route }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  let camera = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const [microphoneStatus, setMicrophoneStatus] = useState(null);
  const [video, setVideo] = useState(null);
  // const { currentUser, admin } = useAuth();

  const newExercise = route.params.newExercise;
  const setNewExercise = route.params.setNewExercise;
  const exerciseName = route.params.exerciseName;

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
        console.log("Video recorded", recordedVideo.uri);
        const response = await fetch(recordedVideo.uri);
        const blob = await response.blob();
        navigation.push("VideoRecordPreview", {
          video: blob,
          setNewExercise: setNewExercise,
          newExercise: newExercise,
          uri: recordedVideo.uri,
        });
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
    width: 800,
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
