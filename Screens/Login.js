import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../Components/Auth/Logo";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Input from "../Components/Auth/Input";
import Button, { Link } from "../Components/Auth/Button";
import { useDispatch, useSelector } from "react-redux";
import Baseurl from "../Components/Auth/Baseurl";

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
    </SafeAreaView>
  );
}
