import React, { useState } from "react";
import { View,ScrollView,TextInput } from "react-native";
import { Text,Divider,List,Headline, Button} from "react-native-paper"
export default function ExerciseList({navigation}){

    const exercisesOrigin = [
        {
            name:"Yoga",
            desc:"Relax the body and mind, relieve the mood"
        },
        {
            name:"Sit-ups",
            desc:"High intensity fat burning and muscle strengthening"
        },
        {
            name:"Jogging",
            desc:"Improve body endurance"
        },
        {
            name:"Yoga",
            desc:"Relax the body and mind, relieve the mood"
        },
        {
            name:"Sit-ups",
            desc:"High intensity fat burning and muscle strengthening"
        },
        {
            name:"Jogging",
            desc:"Improve body endurance"
        },
        {
            name:"Yoga",
            desc:"Relax the body and mind, relieve the mood"
        },
        {
            name:"Sit-ups",
            desc:"High intensity fat burning and muscle strengthening"
        },
        {
            name:"Jogging",
            desc:"Improve body endurance"
        },
        {
            name:"Yoga",
            desc:"Relax the body and mind, relieve the mood"
        },
        {
            name:"Sit-ups",
            desc:"High intensity fat burning and muscle strengthening"
        },
        {
            name:"Jogging",
            desc:"Improve body endurance"
        },
        {
            name:"Yoga",
            desc:"Relax the body and mind, relieve the mood"
        },
        {
            name:"Sit-ups",
            desc:"High intensity fat burning and muscle strengthening"
        },
        {
            name:"Jogging",
            desc:"Improve body endurance"
        },
        
    ]
    const [keywords,setKeywords] = useState("");
    const [exercises,setExercises] = React.useState(exercisesOrigin);
    
    return (
        <View className = "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Headline style={{"textAlign":"center"}}>Exercises List</Headline>
            <View 
                className="flex flex-row mt-5"
            >
                <TextInput
                        label="Exercise Name"
                        value = {keywords}
                        placeholder="Search exercises"
                        onChangeText={(value)=>setKeywords(value)}
                        className="block flex-grow appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                <Button
                    onPress={()=>setExercises(exercisesOrigin.filter(exercise=>exercise.name.toLowerCase().includes(keywords.toLowerCase())))}
                >
                    Search
                </Button>
            </View>
            <ScrollView >
                {
                    exercises.map((exercise,index)=>{
                            return (
                                <View>
                                    
                                    <View className="mt-1">
                                        <List.Item
                                            onPress={()=>navigation.push("Instruction",{title:exercise.name})}
                                            title={exercise.name}
                                            description={exercise.desc}
                                            left={props => <List.Icon color="orange"  icon="alpha-e-box" />}
                                        />
                                    </View>
                                    <Divider />
                                </View>
                                
                            )
                            })
                }
                
            </ScrollView>
        </View>
        
        
      );
}