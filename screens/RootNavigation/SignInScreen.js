import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import { AuthContext } from "../../components/context";

const initialValues = {
  email: "",
  password: "",
};
const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

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
    }
  };
  const SignInMethod = () => {
    const email = values.email.trim();
    const password = values.password.trim();

    if (password.length > 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          signIn(result.user.refreshToken);
        })
        .catch((err) => {
          Alert.alert("Error", "Email or Password is incorrect", [
            { text: "OK" },
          ]);
          console.log(err);
        });
    }
  };
  return (
    <LinearGradient
      colors={["#181818", "#0F0F0F", "#0C0C0C"]}
      style={{ flex: 1, alignItems: 'center' }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ height: 250, marginTop: 0, width: 300 }}
          resizeMode="center"
          source={require("../../assets/logo.png")}
        />
      </View>
      <KeyboardAvoidingView behavior={"position"}>
        <View style={{ alignItems: "flex-start"}}>
          <Text
            style={{
              fontFamily: "SemiBold",
              color: "#fff",
              fontSize: 24,
              textAlign: "left",
            }}
          >
            Увійти
          </Text>
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.8)"
            placeholder="Email   "
            style={[styles.textInput, { marginTop: 30, color: "#fff" }]}
            value={values.email}
            onChangeText={(val) => handleInputChange(val, "email")}
            autoCapitalize={"none"}
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
            placeholder="Пароль   "
            style={[styles.textInput, { marginTop: 30, color: "#Fff" }]}
            secureTextEntry={true}
            value={values.password}
            onChangeText={(val) => handleInputChange(val, "password")}
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
          <TouchableOpacity onPress={() => SignInMethod()}>
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
                Увійти
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
              onPress={() => navigation.navigate("SignUpScreen")}
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
                Зареєструватися
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 5,
    marginTop: 25,
    fontFamily: "Medium",
    fontSize: 15,
  },
});
