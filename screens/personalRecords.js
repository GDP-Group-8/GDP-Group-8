// import React, { useState, useEffect } from "react";
// import { View, ScrollView, TextInput } from "react-native";
// import { Text, Divider, List, Headline, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
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
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function PersonalRecords({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const { currentUser, admin } = useAuth();

  useEffect(() => {
    (async () => {
      //request camera permission not using requestPermissionsAsync
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  if (cameraPermission === null) {
    return <View />;
  }
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleRecord = async () => {
    if (!isRecording) {
      setIsRecording(true);
      const video = await camera.recordAsync();
      const asset = await MediaLibrary.createAssetAsync(video.uri);
      // Add code here to upload the video to YouTube and store the link in the database
      try {
        const authCode = "YOUR_AUTHORIZATION_CODE";
        const accessToken = await getAccessToken(authCode);
        const videoId = await uploadVideo(
          accessToken,
          asset.uri,
          "My Video",
          "This is a test video"
        );
        await storeVideoLink(videoId);
        alert("Video uploaded and link stored successfully");
      } catch (error) {
        alert("Error uploading video and storing link");
      }
    } else {
      setIsRecording(false);

      camera.stopRecording();
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
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
