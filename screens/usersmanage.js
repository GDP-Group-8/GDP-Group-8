import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput } from "react-native";
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
      <ScrollView style={{ backgroundColor: "#111" }}>
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
  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>{adminRender}</View>
  );
}
