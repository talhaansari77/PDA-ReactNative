import { ActivityIndicator, Alert, Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Input from "../Components/Auth/Input";
import Button, { Link } from "../Components/Auth/Button";
import { appColors } from "../assets/Colors/Colors";

const Signup = ({ navigation }) => {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCPassword, setUserCPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const SubmitLogin = () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName.trim(),
        email: userEmail.trim(),
        password: userPassword,
        type: "regular",
        contact: "",
        picture: "",
      }),
    };
    if (userCPassword === userPassword) {
      fetch(
        Baseurl+"Users/Users.php",
        requestOptions
        )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status == true) {
            setLoading(false);
            navigation.navigate("LoginUser");
          }else{
            setLoading(false);
            Alert.alert(data.Message);
          }
        });
    } else {
      setLoading(false);
      Alert.alert("Password does not Match");
    }
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
      <View style={styles.shc}>
        <View>
          <Text style={styles.sh}>Signup</Text>
        </View>
      </View>

      <View style={styles.mt5}>
        <Input
          placeholder="Username"
          keyboardType="email-address"
          iconname={"user"}
          onChangeText={(text) => setUserName(text)}
        />
        <Input
          placeholder="Enter Email"
          keyboardType="email-address"
          iconname={"user"}
          onChangeText={(text) => setUserEmail(text)}
        />
        <Input
          placeholder="Password"
          iconname={"lock"}
          secureTextEntry={true}
          onChangeText={(text) => setUserPassword(text)}
        />
        <Input
          placeholder="Confirm Password"
          iconname={"lock"}
          secureTextEntry={true}
          onChangeText={(text) => setUserCPassword(text)}
        />

        {/* <Divider size={1} style={{ marginHorizontal: 50, marginTop: 10 }} /> */}
        <Button
          text={loading?<ActivityIndicator color={"#fff"} size={26}/> :"Sign-up"}
          size={20}
          color={appColors.secondary}
          onPress={() => {
            SubmitLogin();
          }}
        />

        <Divider size={1} style={{ marginHorizontal: 150, marginTop: 10 }} />
        <Link
          navigation={navigation}
          link={"click here"}
          desc={"Wanna Become Seller ?"}
          pageName={"SellerSignup"}
        />
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  sh: {
    fontSize: 25,
    color: appColors.secondary,
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginLeft: 20,
  },
  shc: {
    // alignItems:"center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 20,
    // backgroundColor: "#eee",
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    width: "100%",
  },
  mt5: {
    marginTop: 30,
  },
});
