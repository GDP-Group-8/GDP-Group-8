import * as React from "react";
import { Provider } from "react-native-paper";
import { theme } from "./core/theme";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CleanTabBar } from "react-navigation-tabbar-collection";
import { HomeIcon, Cog8ToothIcon, FireIcon } from "react-native-heroicons/mini";
import {
  LoginScreen,
  ForgotPasswordScreen,
  HomeScreen,
  RegisterScreen,
} from "./screens";
import Dashboard from "./screens/dashboard";
import UsersManage from "./screens/usersmanage";
import UserDetail from "./screens/userdetail";
import MyProfile from "./screens/myprofile";
import { AuthProvider } from "./contexts/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "./screens/settings";
import ExerciseList from "./screens/exerciseList";

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeTab = createBottomTabNavigator();

function HomeTabs() {
  return (
    //multiple icons for tab bar
    <HomeTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CleanTabBar {...props} />}
    >
      <HomeTab.Screen
        name="Home"
        component={Dashboard}
        options={{ icon: HomeIcon }}
      />
      <HomeTab.Screen
        name="Exercises"
        component={ExerciseListStackScreen}
        options={{ icon: FireIcon }}
      />
      <HomeTab.Screen
        name="Settings"
        component={AdminStackScreen}
        options={{ icon: Cog8ToothIcon }}
      />
    </HomeTab.Navigator>
  );
}

const AdminStack = createNativeStackNavigator();
function AdminStackScreen() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="Settings" component={Settings} />
      <AdminStack.Screen name="MyProfile" component={MyProfile} />
      <AdminStack.Screen name="UsersManage" component={UsersManage} />
      <AdminStack.Screen name="UserDetail" component={UserDetail} />
    </AdminStack.Navigator>
  );
}

const ExerciseListStack = createNativeStackNavigator();
function ExerciseListStackScreen() {
  return (
    <ExerciseListStack.Navigator screenOptions={{ headerShown: false }}>
      <ExerciseListStack.Screen name="ExerciseList" component={ExerciseList} />
    </ExerciseListStack.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <AuthProvider>
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={HomeTabs} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </Provider>
    </AuthProvider>
  );
};


