import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator, passwordValidator } from "../core/utils";
import { Navigation } from "../types";
import axios from "axios";

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { currentUser, setCurrentUser, setAdmin, setCurrentUserUid } =
    useAuth();

  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {
  //     setCurrentUser(user);

  //     navigation.navigate("Dashboard");
  //   } else {
  //     console.log("No user logged in");
  //   }
  // });

  useEffect(() => {
    if (currentUser) {
      navigation.navigate("Dashboard");
    }
  }, [currentUser, navigation]);

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const res = await logInWithEmailAndPassword(email.value, password.value);
    const res2 = await axios.get(
      "http://10.6.20.74:5000/members/" + res.user.uid
    );
    setAdmin(res2.data[0].admin);
    setCurrentUser(res.user);
    setCurrentUserUid(res.user.uid);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("HomeScreen")} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
