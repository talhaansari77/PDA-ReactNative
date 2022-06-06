import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../Components/Auth/Title";
import { appColors } from "../assets/Colors/Colors";
import Input from "../Components/Auth/Input";
import { Divider } from "react-native-elements";
import Button from "../Components/Auth/Button";
import Baseurl from "../Components/Auth/Baseurl";

export default function EditProfile({ navigation }) {
  const { status, user } = useSelector(
    (state) => state.CreateUserReducer.activeUser
  );

  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userPassword, setUserPassword] = useState("");
  const [userCPassword, setUserCPassword] = useState("");
  const [userContact, setUserContact] = useState(user.contact);
  const [usercnic, setUserCnic] = useState(user.cnic);
  const [userCity, setUserCity] = useState(user.city);
  const [userBusiness, setUserBusiness] = useState(user.business);
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

  const SaveChanges = () => {
    const userData = {
      id: user.id,
      name: userName,
      email: userEmail,
      password: userCPassword === userPassword ? userPassword : user.password,
      type: user.type,
      contact: userContact,
      business: userBusiness,
      city: userCity,
      cnic: usercnic,
      picture: user.picture,
      shopId: user.shopId,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };
    if (
      userCPassword === userPassword &&
      userEmail.length > 0 &&
      userContact.length > 0
    ) {
      fetch(Baseurl + "Users/UpdateUser.php", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status == true) {
            activateUser(userData);
            navigation.navigate("Profile1");
            ToastAndroid.show(
              "Profile Updated Successfully",
              ToastAndroid.SHORT
            );
          } else {
            console.log(data);
          }
          // console.log(data.status);
        });
    } else {
      Alert.alert("Password Does Not Match Try Again");
    }
  };

  return (
    <View>
      <ImageBackground
        source={require("../assets/images/bg-wallpaper5.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <Title text={"Edit Profile"} />

        <ScrollView>
          <Input
            value={userName}
            placeholder="Username"
            keyboardType="email-address"
            iconname={"user"}
            onChangeText={(text) => setUserName(text)}
          />
          <Input
            value={userEmail}
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
            value={usercnic}
            placeholder="CNIC 34xxx-xxxxxxx-x"
            keyboardType="numeric"
            iconname={"id-card"}
            onChangeText={(text) => setUserCnic(text)}
          />
          <Input
            value={userContact}
            placeholder="03xxxxxxxxx"
            keyboardType="numeric"
            iconname={"phone"}
            onChangeText={(text) => setUserContact(text)}
          />
          <Input
            value={userBusiness}
            placeholder="Business"
            iconname={"store"}
            onChangeText={(text) => setUserBusiness(text)}
          />

          <Input
            value={userCity}
            placeholder="City"
            iconname={"map-marker-alt"}
            onChangeText={(text) => setUserCity(text)}
          />
          <Divider size={1} style={{ marginHorizontal: 50, marginTop: 10 }} />
          <Button
            text={"Save"}
            size={20}
            color={appColors.secondary}
            onPress={() => {
              SaveChanges();
            }}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
