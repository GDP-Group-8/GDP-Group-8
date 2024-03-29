import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import {  logInWithEmailAndPassword } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { yourIp } from "../firebase";
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
  const [loading, setLoading] = useState(false);

  const { currentUser, setCurrentUser, setAdmin, setCurrentUserUid } =
    useAuth();

  useEffect(() => {
    if (currentUser) {
      navigation.navigate("Dashboard");
    }
  }, [currentUser, navigation]);

  const _onLoginPressed = async () => {
    setLoading(true);

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setLoading(false);
      return;
    }
    const res = await logInWithEmailAndPassword(email.value, password.value);
    const res2 = await axios.get(yourIp + "/members/" + res.user.uid);
    setAdmin(res2.data[0].admin);
    setCurrentUser(res.user);
    setCurrentUserUid(res.user.uid);
    setLoading(false);

  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("HomeScreen")} />

      {/* <Logo /> */}

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
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : null}
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
