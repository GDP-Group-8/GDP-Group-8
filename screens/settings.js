import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text, Linking, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import * as AuthSession from "expo-auth-session";
import * as Random from "expo-random";
import Constants from "expo-constants";

import { logout } from "../firebase";
import { yourIp } from "../firebase";
export default function Settings({ navigation }) {
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
  }, [currentUser, navigation]);

  const handleMyProfilePress = () => {
    // navigate to MyProfile screen
    navigation.navigate("MyProfile");
  };

  const handleManageUsersPress = () => {
    // navigate to ManageUsers screen
    navigation.navigate("UsersManage");
  };

  const handleLogout = async () => {
    try {
      logout();
      setCurrentUser(null);
    } catch (error) {
      console.log(void error);
    }
  };

  const whoop = async () => {
    console.log("whoop");
    // const res = await axios.get(yourIp+"/whoop/auth");
    // Linking.openURL("https://gdp-api.herokuapp.com/whoop/auth");
    Linking.openURL(yourIp + "/whoop/auth?memberId=" + currentUser.uid);
  };

  const useGoogleAuth = () => {
    const [request, response, promptAsync] = AuthSession.useAuthRequest(
      {
        clientId: Constants.manifest.extra.googleClientId,
        scopes: [
          "profile",
          "email",
          "https://www.googleapis.com/auth/fitness.activity.read",
        ],
        redirectUri: AuthSession.makeRedirectUri({
          useProxy: true,
        }),
      },
      { authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth" }
    );

    React.useEffect(() => {
      if (response?.type === "success") {
        const { code } = response.params;
        console.log(code);
        // Send the code to your backend server for token exchange
      }
    }, [response]);

    return { request, promptAsync };
  };
  const { request, promptAsync } = useGoogleAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <View style={{ margin: 20 }}>
        <Button
          mode="contained"
          onPress={handleMyProfilePress}
          style={{ marginBottom: 20, backgroundColor: "orange" }}
          labelStyle={{ color: "white" }}
          contentStyle={{ paddingVertical: 5 }}
        >
          My Profile
        </Button>
        <Button
          mode="contained"
          onPress={handleManageUsersPress}
          style={{ marginBottom: 20, backgroundColor: "orange" }}
          labelStyle={{ color: "white" }}
          contentStyle={{ paddingVertical: 5 }}
        >
          Manage Users
        </Button>
        <Button
          mode="contained"
          onPress={whoop}
          style={{ marginBottom: 20, backgroundColor: "orange" }}
          labelStyle={{ color: "white" }}
          contentStyle={{ paddingVertical: 5 }}
        >
          Whoop
        </Button>
        <Button
          mode="contained"
          disabled={!request}
          onPress={() => {
            promptAsync({ useProxy: true });
          }}
          style={{ marginBottom: 20, backgroundColor: "orange" }}
          labelStyle={{ color: "white" }}
          contentStyle={{ paddingVertical: 5 }}
        >
          Sign in with Google
        </Button>
        <Button
          mode="contained"
          onPress={() => handleLogout()}
          labelStyle={{ color: "white" }}
          style={{ backgroundColor: "orange" }}
          contentStyle={{ paddingVertical: 5 }}
        >
          Sign out
        </Button>
      </View>
    </SafeAreaView>
  );
}
