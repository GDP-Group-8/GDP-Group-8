import React, { useState, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { Text, Headline, Appbar } from "react-native-paper";
import WebView from "react-native-webview";
import ExerciseList from "./exerciseList";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Instruction({ navigation, route }) {
  const instructions = route.params.exercise.instructions;
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const regex = /[?&]v=([^&]+)/;
  const url = route.params.exercise.demo.toString();
  const videoId = url.match(regex);

  const isYoutubeUrl = (url) => {
    return url.match(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|(?:m\.)?youtube\.com\/(?:watch|v|embed)(?:\?v=|\/))([a-zA-Z0-9_-]{7,15})(?:[\?&][a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*(?:#[a-zA-Z0-9_-]*)?$/i
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(47,47,47)" }}>
      <Appbar.Header style={{ backgroundColor: "rgb(47,47,47)" }}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={"white"}
        />
        <Appbar.Content
          titleStyle={{ fontWeight: "bold", color: "white" }}
          title={route.params.exercise.name.toString().toUpperCase()}
        />
      </Appbar.Header>
      {isYoutubeUrl(url) ? (
        <YoutubePlayer
          height={300}
          videoId={videoId[1]}
          onChangeState={onStateChange}
        />
      ) : (
        <WebView source={{ uri: url }} style={{ height: 300 }} />
      )}
      <ScrollView>
        <Headline
          style={{
            paddingLeft: 25,
            fontWeight: "800",
            fontSize: 30,
            color: "white",
          }}
        >
          Instruction
        </Headline>
        {instructions.map((instruction, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              paddingRight: 40,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                marginLeft: 25,
                fontSize: 18,
                color: "white",
              }}
            >
              {index + 1}.
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 18,
                color: "white",
              }}
              key={instruction.id}
            >
              {instruction}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
