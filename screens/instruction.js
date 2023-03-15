import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Headline, Appbar } from "react-native-paper";
import WebView from "react-native-webview";
import ExerciseList from "./exerciseList";
export default function Instruction({ navigation, route }) {
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
  return (
    <View style={{ flex: 1 ,backgroundColor: "rgb(47,47,47)"}}>
      <Appbar.Header style={{backgroundColor: "rgb(47,47,47)"}} >
        <Appbar.BackAction 
          onPress={() => {
            navigation.navigate("ExerciseList");
          }}
          color={'white'}
        />
        <Appbar.Content
          titleStyle={{fontWeight:"bold",color:'white'}}
          title={route.params.exercise.name.toString().toUpperCase()}
        />
      </Appbar.Header>
      <View style={{ height: 300 }}>
        <WebView
          javaScriptEnabled={true}
          source={{ uri: `https://www.youtube.com/embed/${route.params.exercise.demo.toString().split("watch?v=")[1]}` }}
        />
      </View>
      <ScrollView>
        <Headline
          style={{
            marginLeft: 25,
            marginTop: 20,
            fontWeight: "800",
            fontSize: 30,
            color:'white'
          }}
        >
          Instruction
        </Headline>
        {instructions.map((instruction,index) => (
          <View style={{display:"flex",flexDirection:"row",paddingRight:40}}>
            <Text style={{marginLeft:25,fontSize:18,marginTop:10,color:'white'}}>{index + 1}.</Text>
            <Text
              style={{ marginLeft: 5, fontSize: 18, marginTop: 10 ,color:'white'}}
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
