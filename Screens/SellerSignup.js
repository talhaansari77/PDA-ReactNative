import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View,ImageBackground, Dimensions } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Input from "../Components/Auth/Input";
import Button, { Link } from "../Components/Auth/Button";
import { Picker } from "@react-native-picker/picker";
import { appColors } from "../assets/Colors/Colors";

const SellerSignup = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCPassword, setUserCPassword] = useState("");
  const [userContact, setUserContact] = useState("");
  const [usercnic, setUserCnic] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userBusiness, setUserBusiness] = useState("");

  const SubmitLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userEmail.split("@")[0],
        email: userEmail,
        password: userPassword,
        type: "seller",
        contact: userContact,
        business: userBusiness,
        city: userCity,
        cnic: usercnic,
        picture: "",
      }),
    };
    if (
      userCPassword === userPassword &&
      userEmail.length > 0 &&
      userContact.length > 0
    ) {
      fetch(Baseurl + "Users/Users.php", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status == true) {
            navigation.navigate("LoginUser");
          } else {
            console.log(data);
          }
          // console.log(data.status);
        });
    } else {
      Alert.alert("Invalid Information Please Try Again");
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
          <Text style={styles.sh}>Signup as Seller</Text>
        </View>
      </View>
      <View style={styles.mt5}>
      <ScrollView>
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
        <Input
          placeholder="CNIC 34xxx-xxxxxxx-x"
          keyboardType="numeric"
          iconname={"id-card"}
          onChangeText={(text) => setUserCnic(text)}
        />

        <Input
          placeholder="03xxxxxxxxx"
          keyboardType="numeric"
          iconname={"phone"}
          onChangeText={(text) => setUserContact(text)}
        />
        <Input
          placeholder="Business"
          iconname={"store"}
          onChangeText={(text) => setUserBusiness(text)}
        />

        {/* <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> */}

        <Input
          placeholder="City"
          iconname={"map-marker-alt"}
          onChangeText={(text) => setUserCity(text)}
        />
        {/* <Divider size={1} style={{ marginHorizontal: 50, marginTop: 10 }} /> */}
        <Divider size={1} style={{ marginHorizontal: 150, marginTop: 10 }} />
        <Button
          text={"Sign-up"}
          size={20}
          color={appColors.secondary}
          onPress={() => {
            SubmitLogin();
          }}
        />
        </ScrollView>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SellerSignup;

const styles = StyleSheet.create({
  sh: {
    fontSize: 25,
    color: "darkorange",
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
