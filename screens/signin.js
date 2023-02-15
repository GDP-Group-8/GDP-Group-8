import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logInWithEmailAndPassword } from "../firebase";
import React from "react";
export default function Signin({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState(null);

  //this is a listener that will check if the user is logged in or not
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      navigation.navigate("UsersManage");
    } else {
      console.log("No user logged in");
    }
  });

  React.useEffect(() => {
    if (user) navigation.navigate("UsersManage");
  }, [user]);

  return (
    <View className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <View className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <View className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <View>
            <Text className="block text-sm font-medium text-gray-700">
              Email address
            </Text>
            <View className="mt-1">
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </View>
          </View>

          <View>
            <Text className="block text-sm font-medium text-gray-700">
              Password
            </Text>
            <View className="mt-1">
              <TextInput
                secureTextEntry={true}
                label="Password"
                value={password}
                onChangeText={setPassword}
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </View>
          </View>

          <View>
            <Button
              title="Sign in"
              mode="contained"
              onPress={() => logInWithEmailAndPassword(email, password)}

              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </Button>
          </View>

          <View className="mt-6"></View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
