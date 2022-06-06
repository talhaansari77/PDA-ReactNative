import {
  View,
  Text,
  SafeAreaView,
  Alert,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../Components/Auth/Logo";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Input from "../Components/Auth/Input";
import Button, { Link } from "../Components/Auth/Button";
import { useDispatch, useSelector } from "react-redux";
import Baseurl from "../Components/Auth/Baseurl";
import { appColors } from "../assets/Colors/Colors";

export default function Login({ navigation }) {
  // var user = {};
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const dispatch = useDispatch();
  const activateUser = (userDetail) => {
    dispatch({
      type: "CreateUser",
      payload: {
        ...userDetail,
        status: true,
      },
    });
  };
  const updateState = () => {
    dispatch({
      type: "UpdateMenuId",
    });
  };

  const SubmitLogin = () => {
    fetch(
      Baseurl +
        "Users/CheckUser.php?email=" +
        userEmail +
        "&password=" +
        userPassword
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          activateUser(data.user);
          updateState();
          setUserEmail("");
          setUserPassword("");
          navigation.navigate("Home");
        } else {
          Alert.alert(data.Message);
        }
      });
  };

  return (

    <SafeAreaView>
      <ImageBackground
        source={require("../assets/images/login-page-1.png")}
        style={{
          // width: "100%",
          height: "100%",
          width: Dimensions.get("window").width,
          // height: Dimensions.get("window").height,
          // position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        <Logo name={"user"} color={"orange"} size={150} />
        <Divider size={1} style={{ marginHorizontal: 50, marginTop: 10 }} />

        <Input
          value={userEmail}
          placeholder="Enter Email"
          keyboardType="email-address"
          iconname={"user"}
          onChangeText={(text) => setUserEmail(text.trim())}
        />
        <Input
          value={userPassword}
          placeholder="Password"
          iconname={"lock"}
          secureTextEntry={true}
          onChangeText={(text) => setUserPassword(text)}
        />
        <Button
          text={"Login"}
          size={20}
          color={"darkorange"}
          onPress={() => {
            SubmitLogin();
          }}
        />
        <Divider size={1} style={{ marginHorizontal: 150, marginTop: 10 }} />
        <Link
          navigation={navigation}
          link={"click here"}
          desc={"New User ?"}
          pageName={"Signup"}
        />
      </ImageBackground>
    </SafeAreaView>

  );
}
