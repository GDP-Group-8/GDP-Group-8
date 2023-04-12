import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import axios from "axios";
import { DataTable, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { yourIp } from "../firebase";

export default function UsersManage({ navigation }) {
  const [newUser, setNewUser] = useState({});
  const { currentUser, admin } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    } else {
      fetchData();
    }
  }, [currentUser, navigation]);

  async function fetchData() {
    try {
      const res = await axios.get(yourIp + "/members/");
      console.log(res.data[0]);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async (memberID) => {
    if (memberID === currentUser.uid) {
      alert("You cannot delete yourself!");
    } else {
      try {
        const res = await axios.delete(yourIp + "/members/" + memberID);
        const res2 = await axios.delete(yourIp + "/firebase/" + memberID);
        console.log(res.data);
        console.log(res2.data);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  let adminRender;

  if (admin) {
    adminRender = (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ marginTop: 6 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Email</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>

            {users.map((user) => (
              <DataTable.Row key={user.memberID.toString()}>
                <DataTable.Cell>{user.name}</DataTable.Cell>
                <DataTable.Cell>{user.email}</DataTable.Cell>
                <DataTable.Cell>{user.status}</DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    color="lightblue"
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
                  <Button
                    color="red"
                    mode="text"
                    onPress={() => deleteUser(user.memberID)}
                  >
                    Delete
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    );
  }

  return <View style={{ backgroundColor: "white" }}>{adminRender}</View>;
}
