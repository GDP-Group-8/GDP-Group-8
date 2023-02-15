import React, { useState } from "react";
import { View,TextInput,ScrollView } from "react-native";
import { DataTable , Button ,Headline,RadioButton,Text} from "react-native-paper"
export default function UsersManage({navigation}){

    const [newUser,setNewUser] = React.useState({});

    const [users,setUsers] = React.useState([
        {
            "_id": "63ea2e76c27e349dabad312a",
            "member_id":1,
            "name": "Tim Kelly",
            "email": "Tikelly@tcd.ie",
            "membership_type": "Gold",
            "join_date": "2022-01-01",
            "gym_location": "Dublin"
        },
        
        // 2
        {
            "_id": "63ea2e76c27e349dabad312b",
            "member_id":2,
            "name": "Aaron Byrne",
            "email": "aabyrne@tcd.ie",
            "membership_type": "Silver",
            "join_date": "2022-02-01",
            "gym_location": "Cork"
        },
        
        // 3
        {
            "_id": "63ea2e76c27e349dabad312c",
            "member_id":3,
            "name": "Holly Mcevoy",
            "email": "mcevoyho@tcd.ie",
            "membership_type": "Bronze",
            "join_date": "2022-03-01",
            "gym_location": "Limerick"
        }
        
    ]);


    const addUser = ()=>{
        users.push(newUser);
        setUsers(users);
        setNewUser({});
    }

    const deleteUser = (member_id)=>{
        
        setUsers(users.filter((user,idx)=>user.member_id!==member_id));

    }
    return (
        <ScrollView className = "bg-white">
            <View className="mt-6"></View>
            <Headline style={{"textAlign":"center"}}>Manage Users</Headline>
            <DataTable>
            <DataTable.Header>
                <DataTable.Title>Member ID</DataTable.Title>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title> Operation </DataTable.Title>
            </DataTable.Header>
            {
                users.map((user,index)=>{
                        return <DataTable.Row key={user.member_id}>
                                <DataTable.Cell> {user.member_id} </DataTable.Cell>
                                <DataTable.Cell> {user.name} </DataTable.Cell>
                                <DataTable.Cell>
                                    <Button textColor="lightblue"  mode="text" onPress={() =>{
                                        navigation.push("UserDetail",{user:user,deleteUser:()=>deleteUser(user.member_id)})
                                    }}>
                                        Detail
                                    </Button>
                                </DataTable.Cell>
                            </DataTable.Row>
                        })
            }
            <View className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <View>
                    <Text className="block text-sm font-medium text-gray-700">
                    Member ID
                    </Text>
                    <View className="mt-1">
                    <TextInput
                        label="Member ID"
                        
                        value={newUser.member_id}
                        onChangeText={(value)=>setNewUser({...newUser,member_id:value})}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    </View>
                </View>
                <View>
                    <Text className="block text-sm font-medium text-gray-700">
                    User Name
                    </Text>
                    <View className="mt-1">
                    <TextInput
                        label="User Name"
                        value={newUser.name}
                        onChangeText={(value)=>setNewUser({...newUser,name:value})}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    </View>
                </View>

                <View>
                    <Text className="block text-sm font-medium text-gray-700">
                    Email
                    </Text>
                    <View className="mt-1">
                    <TextInput
                        textContentType="emailAddress"
                        label="Email"
                        value={newUser.email}
                        onChangeText={(value)=>setNewUser({...newUser,email:value})}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    </View>
                </View>

                <View>
                    <Text className="block text-sm font-medium text-gray-700">
                        Membership Type
                    </Text>
                    <View className="mt-1">
                        <RadioButton.Group onValueChange={value => setNewUser({...newUser,membership_type:value})} value={newUser.membership_type}>
                            <RadioButton.Item label="Bronze" value="Bronze" />
                            <RadioButton.Item label="Silver" value="Silver" />
                            <RadioButton.Item label="Gold" value="Gold" />
                        </RadioButton.Group>
                    </View>
                </View>

                <View>
                    <Text className="block text-sm font-medium text-gray-700">
                        Join Date
                    </Text>
                    <View className="mt-1">
                        <TextInput
                            textContentType=""
                            label="Join Date"
                            value={newUser.join_date}
                            onChangeText={(value)=>setNewUser({...newUser,join_date:value})}
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </View>
                </View>

                <View>
                    <Text className="block text-sm font-medium text-gray-700">
                        Gym Location
                    </Text>
                    <View className="mt-1">
                        <TextInput
                            textContentType=""
                            label="Gym Location"
                            value={newUser.gym_location}
                            onChangeText={(value)=>setNewUser({...newUser,gym_location:value})}
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </View>
                </View>
                <View className="mt-6"></View>

                <View >
                    <Button
                    title="Add User"
                    mode="contained"
                    onPress={() => addUser()}
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Add User
                    </Button>
                </View>

                <View className="mt-6"></View>
            </View>
                
            </DataTable>
        </ScrollView>
        
      );
}