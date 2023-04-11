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
import { yourIp } from "../firebase";
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
    const res = await axios.get(yourIp + "/members/");
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
      const res = await axios.delete(yourIp + "/members/" + memberID);
      const res2 = await axios.delete(yourIp + "/firebase/" + memberID);
      console.log(void res.data);
      console.log(void res2.data);
    }
    fetchData();
  };
  let adminRender;
  if (admin) {
    adminRender = (
      <ScrollView className="bg-white" style={{ backgroundColor: "#111" }}>
        <View className="mt-6"></View>
        <Headline style={{ textAlign: "center", color: "white" }}>
          Manage Users
        </Headline>
        <DataTable>
          <DataTable.Header
            style={{ borderBottomColor: "orange", borderBottomWidth: 1 }}
          >
            <DataTable.Title textStyle={{ color: "white" }}>
              Member ID
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: "white" }}>
              Name
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: "white" }}>
              Operation
            </DataTable.Title>
          </DataTable.Header>
          {users.map((user, index) => {
            return (
              <DataTable.Row
                key={user.memberID}
                style={{ borderBottomColor: "#FFA50058", borderBottomWidth: 1 }}
              >
                <DataTable.Cell textStyle={{ color: "white" }}>
                  {user.memberID}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ color: "white" }}>
                  {user.name}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ color: "white" }}>
                  <Button
                    textColor="#FFD580"
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
          <View className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {[
              { label: "Member ID", field: "member_id" },
              { label: "User Name", field: "name" },
              { label: "Email", field: "email" },
            ].map(({ label, field }) => (
              <View key={field}>
                <Text className="block text-sm font-medium text-white">
                  {label}
                </Text>
                <View>
                  <TextInput
                    label={label}
                    value={newUser[field]}
                    onChangeText={(value) =>
                      setNewUser({ ...newUser, [field]: value })
                    }
                    className="block w-full rounded-md px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    style={{ backgroundColor: "#2F2F2F", marginBottom: 8 }}
                  />
                </View>
              </View>
            ))}

            <View>
              <Text className="block text-sm font-medium text-white">
                Membership Type
              </Text>
              <View className="mt-1">
                <RadioButton.Group
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, membershipType: value })
                  }
                  value={newUser.membershipType}
                >
                  {[
                    { label: "Bronze", value: "Bronze", key: "Bronze" },
                    { label: "Silver", value: "Silver", key: "Silver" },
                    { label: "Gold", value: "Gold", key: "Gold" },
                  ].map((obj) => (
                    <RadioButton.Item
                      {...obj}
                      labelStyle={{ color: "white" }}
                    />
                  ))}
                </RadioButton.Group>
              </View>
            </View>

            <View>
              <Text className="block text-sm font-medium text-white">
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
                  className="block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  style={{ backgroundColor: "#2F2F2F", marginBottom: 8 }}
                />
              </View>
            </View>

            <View>
              <Text className="block text-sm font-medium text-white">
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
                  className="block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  style={{ backgroundColor: "#2F2F2F", marginBottom: 8 }}
                />
              </View>
            </View>
            <View className="mt-6"></View>
            <View>
              <Button
                title="Add User"
                mode="contained"
                onPress={() => addUser()}
                className="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                style={{ backgroundColor: "orange" }}
                textColor="white"
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
