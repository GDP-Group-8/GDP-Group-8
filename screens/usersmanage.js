import React, { useState, useEffect } from "react";
import { View, TextInput, ScrollView } from "react-native";
import axios from "axios";
import {
  DataTable,
  Button,
  Headline,
  RadioButton,
  Text,
} from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export default function UsersManage({ navigation }) {
  const [newUser, setNewUser] = React.useState({});
  const { currentUser, admin } = useAuth();
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
    fetchData();
  }, [currentUser, navigation]);

  async function fetchData() {
    const res = await axios.get("http://192.168.170.179:5000/members/");
    console.log(res.data[0]);
    setUsers(res.data);
  }

  const addUser = () => {
    users.push(newUser);
    setUsers(users);
    setNewUser({});
  };

  const deleteUser = async (memberID) => {
    // setUsers(users.filter((user, idx) => user.member_id !== member_id));
    if (memberID === currentUser.uid) {
      alert("You cannot delete yourself!");
    } else {
      const res = await axios.delete(
        "http://192.168.170.179:5000/members/" + memberID
      );
      const res2 = await axios.delete(
        "http://192.168.170.179:5000/firebase/" + memberID
      );
      console.log(res.data);
      console.log(res2.data);
    }
    fetchData();
  };
  let adminRender;
  if (admin) {
    adminRender = (
      <ScrollView className="bg-white">
        <View className="mt-6"></View>
        <Headline style={{ textAlign: "center" }}>Manage Users</Headline>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Member ID</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title> Operation </DataTable.Title>
          </DataTable.Header>
          {users.map((user, index) => {
            return (
              <DataTable.Row key={user.memberID}>
                <DataTable.Cell> {user.memberID} </DataTable.Cell>
                <DataTable.Cell> {user.name} </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    textColor="lightblue"
                    mode="text"
                    onPress={() => {
                      navigation.push("UserDetail", {
                        user: user,
                        deleteUser: () => deleteUser(user.memberID),
                      });
                    }}
                  >
                    Detail
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <View className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <View>
              <Text className="block text-sm font-medium text-gray-700">
                Member ID
              </Text>
              <View className="mt-1">
                <TextInput
                  label="Member ID"
                  value={newUser.member_id}
                  onChangeText={(value) =>
                    setNewUser({ ...newUser, member_id: value })
                  }
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
                  onChangeText={(value) =>
                    setNewUser({ ...newUser, name: value })
                  }
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
                  onChangeText={(value) =>
                    setNewUser({ ...newUser, email: value })
                  }
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </View>
            </View>

            <View>
              <Text className="block text-sm font-medium text-gray-700">
                Membership Type
              </Text>
              <View className="mt-1">
                <RadioButton.Group
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, membershipType: value })
                  }
                  value={newUser.membershipType}
                >
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
                  onChangeText={(value) =>
                    setNewUser({ ...newUser, join_date: value })
                  }
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
                  onChangeText={(value) =>
                    setNewUser({ ...newUser, gym_location: value })
                  }
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </View>
            </View>
            <View className="mt-6"></View>

            <View>
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
  } else {
    adminRender = (
      <View className="mt-6">
        <Text>You cant access this page</Text>
      </View>
    );
  }
  return <View className="bg-white">{adminRender}</View>;
}
