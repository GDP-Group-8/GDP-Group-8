import React, { useState, useEffect, useRef } from "react";
import { View,Text,StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import { Appbar,Button } from "react-native-paper";
import WebView from "react-native-webview";
import { uploadVideo } from "../firebase";

const backgroundColor = "#1E1E1E"; // Even darker gray for background


export default function RecordPreview({ navigation,route }){
    const newExercise = route.params.newExercise;
    const setNewExercise = route.params.setNewExercise;
    const [base64String,setBase64String] = useState("");
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        const reader = new FileReader();
        reader.readAsDataURL(route.params.video);
        reader.onloadend = function() {            
            setBase64String(reader.result)
        }

    },[])
    const uploadExercise = async ()=>{
        if (loading){
            return;
        }
        setLoading(true);
        // Upload the video to Firebase
        const uploadTaskPath = await uploadVideo(route.params.video);
        // Get the download URL
        console.log(uploadTaskPath);
        if(!uploadTaskPath){
            console.log("error upload video");
            return
        }
        setNewExercise({...newExercise,demo:uploadTaskPath});
        setLoading(false);

        navigation.pop(2);
    }
    
    
    return (
        <ScrollView style={{backgroundColor:backgroundColor}}>
            <Appbar.Header style={{ backgroundColor: backgroundColor }}>
                <Appbar.BackAction
                onPress={() => {
                    navigation.pop(2)
                }}
                color={"white"}
                />
                <Appbar.Content
                titleStyle={{ fontWeight: "bold", color: "white" }}
                title="Record Video Preview"
                />
            </Appbar.Header>
            <View style={{ height: 300,backgroundColor:backgroundColor }}>
                {/* <Text style={{color:"red"}} >{route.params.videoURI}</Text> */}
                <WebView
                javaScriptEnabled={true}
                source={{
                    
                    
                    html:`<html>
                            <video width="600px" controls >
                                <source src="${base64String}" type="video/mp4">
                            </video>
                            
                           </html> `
                }}
                />
            </View>
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
    )
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
      width:800
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
  