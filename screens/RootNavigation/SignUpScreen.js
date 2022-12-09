import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpScreen = ({ navigation }) => {
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (name, value) => {
    if (value === "email") {
      setValues({
        ...values,
        email: name,
      });
    } else if (value === "password") {
      setValues({
        ...values,
        password: name,
      });
    } else if (value === "confirmPassword") {
      setValues({
        ...values,
        confirmPassword: name,
      });
    }
  };
  const SignUpPress = () => {
    const email = values.email.trim();
    const password = values.password.trim();
    const confirmPassword = values.confirmPassword.trim();
    if (password === confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          Alert.alert("Succes", "Please verify your email to continue", [
            { text: "Okay" },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <LinearGradient
      colors={["#181818", "#0F0F0F", "#0C0C0C"]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView behavior={"position"}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: 250, marginTop: 0, width: 300 }}
            resizeMode="center"
            source={require("../../assets/images/data-original-removebg-preview.png")}
          />
        </View>
        <View style={{ alignItems: "flex-start", marginLeft: 30 }}>
          <Text
            style={{
              fontFamily: "SemiBold",
              color: "#fff",
              fontSize: 24,
              textAlign: "left",
            }}
          >
            Sign Up
          </Text>
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.8)"
            placeholder="Email "
            style={[styles.textInput, { marginTop: 30, color: "#fff" }]}
            value={values.email}
            onChangeText={(val) => handleInputChange(val, "email")}
          />
          <View
            style={{
              alignSelf: "stretch",
              borderBottomColor: "#fff",
              borderBottomWidth: 1.5,
              width: 300,
              marginLeft: 5,
              marginTop: 5,
            }}
          />
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.8)"
            placeholder="Password   "
            style={[styles.textInput, { marginTop: 30, color: "#fff" }]}
            value={values.password}
            onChangeText={(val) => handleInputChange(val, "password")}
            autoCapitalize={"none"}
            secureTextEntry={true}
          />
          <View
            style={{
              alignSelf: "stretch",
              borderBottomColor: "#fff",
              borderBottomWidth: 1.5,
              width: 300,
              marginLeft: 5,
            }}
          />
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.8)"
            placeholder="Confirm Password    "
            style={[styles.textInput, { marginTop: 30, color: "#fff" }]}
            textBreakStrategy="balanced"
            value={values.confirmPassword}
            onChangeText={(val) => handleInputChange(val, "confirmPassword")}
            autoCapitalize={"none"}
            secureTextEntry={true}
          />
          <View
            style={{
              alignSelf: "stretch",
              borderBottomColor: "#fff",
              borderBottomWidth: 1.5,
              width: 300,
              marginLeft: 5,
            }}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity onPress={() => SignUpPress()}>
            <LinearGradient
              colors={["#71C9B1", "#4DC2C2", "#23BAD6"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                borderRadius: 20,
                height: 35,
                width: 245,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "SemiBold",
                  fontSize: 18,
                }}
              >
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <LinearGradient
            colors={["#71C9B1", "#4DC2C2", "#23BAD6"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
              marginTop: 10,
              height: 38,
              width: 245,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: 36,
                width: 243,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0e0e0e",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "SemiBold",
                  fontSize: 18,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 5,
    marginTop: 25,
    fontFamily: "Medium",
    fontSize: 15,
  },
});
