import React from "react";
import { View,TextInput } from "react-native";
import { DataTable , Button ,Headline,RadioButton,Text} from "react-native-paper"
export default function UsersManage(props){

    const [userName, setUserName] = React.useState("");
    const [age, setAge] = React.useState("");
    const [gender, setGender] = React.useState("");

    const [users,setUsers] = React.useState([
        {
            name:"Alice",
            age:18,
            gender:"female"
        },
        {
            name:"Bob",
            age:20,
            gender:"male"
        },
        {
            name:"Kite",
            age:24,
            gender:"female"
        }
    ]);


    const addUser = ()=>{
        users.push({
            name:userName,
            age:age,
            gender:gender
        });
        setUsers(users);
        setUserName("");
        setAge("");
        setGender("");
    }

    const deleteUser = (index)=>{
        
        setUsers(users.filter((value,idx)=>idx!==index));

    }
    return (
        <View className = "bg-white">
            <View className="mt-6"></View>
            <Headline style={{"textAlign":"center"}}>Manage Users</Headline>
            <DataTable>
            <DataTable.Header>
                <DataTable.Title>#</DataTable.Title>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title >Age</DataTable.Title>
                <DataTable.Title >Gender</DataTable.Title>
                <DataTable.Title> Operation </DataTable.Title>
            </DataTable.Header>
            {
                users.map((user,index)=>{
                        return <DataTable.Row>
                                <DataTable.Cell> {index + 1} </DataTable.Cell>
                                <DataTable.Cell> {user.name} </DataTable.Cell>
                                <DataTable.Cell> {user.age} </DataTable.Cell>
                                <DataTable.Cell> {user.gender} </DataTable.Cell>
                                <DataTable.Cell>
                                    <Button textColor="red" mode="text" onPress={() =>{
                                        deleteUser(index);
                                    }}>
                                        Delete
                                    </Button>
                                </DataTable.Cell>
                            </DataTable.Row>
                        })
            }
            <View className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <View>
                    <Text className="block text-sm font-medium text-gray-700">
                    User Name
                    </Text>
                    <View className="mt-1">
                    <TextInput
                        label="User Name"
                        value={userName}
                        onChangeText={setUserName}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    </View>
                </View>

                <View>
                    <Text className="block text-sm font-medium text-gray-700">
                    Age
                    </Text>
                    <View className="mt-1">
                    <TextInput
                        textContentType="number"
                        label="Age"
                        value={age}
                        onChangeText={setAge}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    </View>
                </View>

                <View>
                    <Text className="block text-sm font-medium text-gray-700">
                        Gender
                    </Text>
                    <View className="mt-1">
                        <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
                            <RadioButton.Item label="Male" value="male" />
                            <RadioButton.Item label="Female" value="female" />
                        </RadioButton.Group>
                    </View>
                </View>

                <View>
                    <Button
                    title="Sign in"
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
        </View>
        
      );
}