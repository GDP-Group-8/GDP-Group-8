import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, Linking, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { logout } from "../firebase";
import { yourIp } from "../firebase";
import { useAuthRequest } from "expo-auth-session/providers/google";
WebBrowser.maybeCompleteAuthSession();

export default function Settings({ navigation }) {
  const { currentUser, setCurrentUser } = useAuth();
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "114397723313-b2b9mn4401nt72anlmk9fqosbu0jlc3b.apps.googleusercontent.com",
    scopes: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/fitness.activity.read",
    ],
    redirectUri: makeRedirectUri({
      useProxy: true,
    }),
  });
  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("HomeScreen");
    }
    if (response?.type === "success") {
      console.log("response ", response);
      setToken(response.authentication.accessToken);
      console.log("Access token " + response.authentication.accessToken);
      console.log("Refresh token " + response.authentication.refreshToken);
      console.log("expires " + response.authentication.expiresIn);
      getUserInfo();
    }
  }, [currentUser, navigation, response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

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
        {userInfo === null ? (
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
        ) : (
          //text with user info in white
          <Text style={{ color: "white" }}>
            {userInfo.name} {userInfo.email}
          </Text>
        )}
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
