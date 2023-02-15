import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "./screens/signin";
import Dashboard from "./screens/dashboard";
import UsersManage from "./screens/usersmanage";
import UserDetail from "./screens/userdetail";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId,setUserId] = React.useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="UsersManage" component={UsersManage}  />
        <Stack.Screen name="UserDetail" component={UserDetail} />

        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
