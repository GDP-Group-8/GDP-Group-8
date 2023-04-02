import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView,Text ,StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
const primaryColor = "orange"; // Orange
const secondaryColor = "#2F2F2F"; // Dark gray
const backgroundColor = "#1E1E1E"; // Even darker gray for background
export default function AddExercise({ navigation }) {

    const [newExercise,setNewExercise] = useState({name:"",desc:"",demo:""})
    const [instructions,setInstructions] = useState([""])

    const changeInstruction = (text,idx)=>{
        const newInstructions = [...instructions];
        newInstructions[idx] = text
        setInstructions(newInstructions);
    }
    const addInstruction = ()=>{
        const newInstructions = [...instructions];
        newInstructions.push(" ");
        setInstructions(newInstructions);
    }
    const addExercise = async ()=>{
        // Send the video URL to the backend
        try {
            await axios.post(yourIp + "/exercises/upload", {
              title: newExercise.name,
              description: "This is a test video",
              videoURL: newExercise.demo, // Send the video URL as videoURL
            });
          } catch (error) {
            alert("Error uploading video and storing link: " + error);
          }
    }

    return (
        <ScrollView className=" py-8 px-4 shadow sm:rounded-lg sm:px-10" style={{backgroundColor: backgroundColor }}>
            <Text style={styles.heading}>Create an Exercise</Text>
            <View >
                <View>
                    <TextInput
                            placeholderTextColor="grey"
                            placeholder="Exercise Name"
                            value={newExercise.name}
                            onChangeText={(value) =>
                                setNewExercise({ ...newExercise, name: value })
                            }
                            style={styles.input}
                    />
                </View>
            </View>
           
            <View >
                <View>
                    
                    {
                        instructions.map((instruction,idx)=>(
                            <View className="mt-1">
                                
                                <TextInput
                                    placeholderTextColor="grey"
                                    placeholder={"Instruction " + (idx + 1)}
                                    value={instructions[idx]}
                                    onChangeText={(value) =>
                                        changeInstruction(value,idx)
                                    }
                                    style={styles.input}
                                />
                                
                            </View>
                        ))
                    }
                    
                    
                </View>
            </View>
            <View className="mb-5 mt-2">
                        
                    <Button
                        icon="plus"
                        mode="contained"
                        buttonColor="orange"
                        style={styles.button}
                        onPress={() => {
                            addInstruction()
                        }}
                        >
                        Add Instruction
                    </Button>
            </View>

            <View>
              <Button
                icon="camera"
                mode="contained"
                buttonColor="orange"
                style={styles.button}
                onPress={() => {
                    navigation.push("VideoRecord", { setNewExercise: setNewExercise ,newExercise:newExercise});
                }}
                >
                Record Video
              </Button>
              <Text  className="text-center mt-5 mb-5" style={{color:"orange"}}>
                Video URL:{newExercise.demo}
              </Text>
            </View>
            <View>
              <Button
                mode="contained"
                buttonColor="orange"
                style={styles.button}
                onPress={() => addExercise()}
               >
                Add Exercise
              </Button>
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: secondaryColor,
      paddingHorizontal: 10,
      marginBottom: 10,
      color: primaryColor,
      backgroundColor: secondaryColor,
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 10,
      fontSize: 24,
      color: primaryColor,
    },
    
    customButton: {
      backgroundColor: primaryColor,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
      marginBottom: 20,
    },
    customButtonText: {
      color: backgroundColor,
      fontSize: 18,
    },
    button: {
      color: "orange",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 20,
      color: backgroundColor,
      fontWeight: "bold",
    },
  });
