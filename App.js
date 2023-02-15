import * as React from "react";
import { Provider } from "react-native-paper";
import { theme } from "./core/theme";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Signin from "./screens/signin";
import {
  LoginScreen,
  ForgotPasswordScreen,
  HomeScreen,
  RegisterScreen,
} from "./screens";
import Dashboard from "./screens/dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name="Signin" component={Signin} /> */}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
