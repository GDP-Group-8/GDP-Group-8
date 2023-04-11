import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { yourIp } from "../firebase";

export default function MyProfile({ navigation }) {
  const [name, setName] = useState("");
  const { currentUser, admin } = useAuth();
  const [email, setEmail] = useState("");
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
    fetchData();
  }, [currentUser, navigation]);

  async function fetchData() {
    const res2 = await axios.get(yourIp + "/members/" + currentUser.uid);
    console.log(void res2.data[0]);
    setName(res2.data[0].name);
    setEmail(res2.data[0].email);
  }

  const handleEditPress = () => {
    setEditable(true);
  };

  const handleSavePress = () => {
    setEditable(false);
    // update user's profile information in the database
  };
  const props = editable
    ? { text: "Save", onPress: handleSavePress }
    : { text: "Edit", onPress: handleEditPress };
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#111" }}>
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
          textAlign: "center",
          color: "white",
        }}
      >
        My Profiles
      </Text>
      <TextInput
        label={<Text style={{ color: "#ffffff80" }}>Name</Text>}
        value={name}
        editable={false}
        style={{
          marginBottom: 20,
          backgroundColor: "#2e2e2e",
          borderRadius: 5,
        }}
        textColor="white"
        labelStyle={{ color: "orange" }}
      />
      <TextInput
        label={<Text style={{ color: "#ffffff80" }}>Email</Text>}
        value={email}
        editable={editable}
        onChangeText={(text) => setEmail(text)}
        style={{
          marginBottom: 20,
          backgroundColor: "#2e2e2e",
          borderRadius: 5,
        }}
        textColor="white"
      />
      <MyButton {...props} />
    </View>
  );
}

const MyButton = ({ onPress, text }) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      buttonColor="orange"
      style={{ borderRadius: 5 }}
    >
      {text}
    </Button>
  );
};
