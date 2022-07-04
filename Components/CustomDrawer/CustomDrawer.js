import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Auth/Button";
import { appColors } from "../../assets/Colors/Colors";

export default function CustomDrawer({ locationText, status, ...props }) {
  // const [locationText, setLocationText] = useState("");
  var user = {};
  user = useSelector((state) => state.CreateUserReducer.activeUser.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // CurrentLocation(setLocationText);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#FD703B" }}
      >
        <ImageBackground
          source={require("../../assets/images/bg4.jpg")}
          style={{ padding: 20 }}
        >
          <View style={{ padding: 30 }}>
            <Image
              source={{
                uri:
                  user.picture && user.picture != "image"
                    ? user.picture
                    : userIcon,
              }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
                // marginLeft: -10,
                top: 40,
                left: -20,
              }}
            />
            <Text
              style={{
                top: 40,
                left: -20,
                fontSize: 20,
                fontWeight: "700",
                color: "#f3f3f3",
              }}
            >
              {user.name ? user.name : "UserName"}
            </Text>
            <Text
              style={{
                color: "#f3f3f3",
                justifyContent: "center",
                top: 40,
                left: -20,
              }}
            >
              {locationText.split(",")[0] + "," + locationText.split(",")[1]}
            </Text>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{ marginBottom: 20 }}>
        {status ? (
          <Button
            text="Logout"
            size={20}
            color={appColors.secondary}
            onPress={() => {
              CustomConfirmAlert(
                "Important",
                "Are Your Sure You Want To Logout",
                () => {
                  dispatch({
                    type: "Logout",
                  });
                }
              );
              // console.log(res);
            }}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

export var userIcon = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const CustomConfirmAlert = (title, msg, onConfirm) => {
  Alert.alert(title, msg, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel"),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        onConfirm();
      },
    },
  ]);
};
