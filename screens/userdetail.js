import React from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
export default function UserDetail({ navigation, route }) {
  const user = route.params.user;

  return (
    <View className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <View className="mt-6"></View>
      <Text>
        Member ID:<Text style={{ fontWeight: "800" }}>{user.memberID}</Text>
      </Text>
      <Text>
        Name:<Text>{user.name}</Text>
      </Text>
      {/* <Text>
        E-mail:<Text>{user.email}</Text>
      </Text> */}
      <Text>
        Membership Type:<Text>{user.membershipType}</Text>
      </Text>
      {/* <Text>
        Join Date:<Text>{user.join_date}</Text>
      </Text>
      <Text>
        Gym Location:<Text>{user.gym_location}</Text>
      </Text> */}
      <Button
        title="Delete"
        mode="contained"
        onPress={() => {
          route.params.deleteUser();
          navigation.goBack();
        }}
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Delete
      </Button>
    </View>
  );
}
