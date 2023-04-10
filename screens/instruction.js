import React, { useState, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { Text, Headline, Appbar } from "react-native-paper";
import WebView from "react-native-webview";
import ExerciseList from "./exerciseList";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Instruction({ navigation, route }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const instructions = [
    {
      id: 1,
      text: "Lie on the ground with knees bent",
    },
    {
      id: 2,
      text: "Slightly separate the left and right feet",
    },
    {
      id: 3,
      text: "Back off the ground, head up",
    },
    {
      id: 4,
      text: "Straighten both hands up at the same time Straighten both hands up at the same time",
    },
    {
      id: 5,
      text: "Sit-ups",
    },
  ];
  const regex = /[?&]v=([^&]+)/;
  const url = route.params.exercise.demo.toString();
  const videoId = url.match(regex)[1];
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
      <YoutubePlayer
        height={300}
        videoId={videoId}
        onChangeState={onStateChange}
      />
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
              {instruction.text}
            </Text>
          </View>
        ))}
        {/* <Text style={{marginLeft:25,fontSize:18,marginTop:10}} >Detailed instructions</Text> */}
      </ScrollView>
    </View>
  );
}
