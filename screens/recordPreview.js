import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Appbar, Button } from "react-native-paper";
import VideoPlayer from "expo-video-player";
import { uploadVideo } from "../firebase";

const backgroundColor = "#1E1E1E"; // Even darker gray for background

export default function RecordPreview({ navigation, route }) {
  const newExercise = route.params.newExercise;
  const setNewExercise = route.params.setNewExercise;
  const [uri, setUri] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const localUri = await route.params.uri;
      setUri(localUri);
    })();
  }, []);
  const uploadExercise = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    // Upload the video to Firebase
    const uploadTaskPath = await uploadVideo(
      route.params.video,
      newExercise.name
    );
    // Get the download URL
    console.log(uploadTaskPath);
    if (!uploadTaskPath) {
      console.log("error upload video");
      return;
    }
    setNewExercise({ ...newExercise, demo: uploadTaskPath });
    setLoading(false);

    navigation.pop(2);
  };

  return (
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      <Appbar.Header style={{ backgroundColor: backgroundColor }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.pop(2);
          }}
          color={"white"}
        />
        <Appbar.Content
          titleStyle={{ fontWeight: "bold", color: "white" }}
          title="Record Video Preview"
        />
      </Appbar.Header>
      {uri && (
        <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: "cover",
            source: {
              uri: uri,
            },
          }}
          inFullscreen={false}
          videoBackground="transparent"
          height={300}
        />
      )}
      <View className="mb-5 mt-2">
        <Button
          icon="plus"
          mode="contained"
          buttonColor="orange"
          style={styles.button}
          onPress={uploadExercise}
          loading={loading}
        >
          upload Video
        </Button>
      </View>
    </ScrollView>
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
    color: "orange",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
});
