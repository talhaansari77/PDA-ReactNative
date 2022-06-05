import { View, Text, SafeAreaView, Alert,ImageBackground } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Input from "../Components/Auth/Input";
import Button from "../Components/Auth/Button";
import Title from "../Components/Auth/Title";
import { useSelector } from "react-redux";
import Baseurl from "../Components/Auth/Baseurl";
import axios from "axios";
import { appColors } from "../assets/Colors/Colors";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const menuId = useSelector(
    (state) => state.CreateUserReducer.activeUser.menuId
  );

  const Submit = () => {
    if (category.length > 0) {
      axios
        .post(
          Baseurl + "Categories/Category.php",
          JSON.stringify({
            name: category,
            menuId: menuId,
          })
        )
        .then((response) => {
          if (response.data.status) {
            Alert.alert("Category Added");
            setCategory("");
          } else {
            Alert.alert(response.data.Message);
          }
        });
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/images/bg-wallpaper5.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
      <Title text={"Add-Category"} />
      <Input
        value={category}
        placeholder={"Category Name"}
        onChangeText={(text) => setCategory(text)}
      />
      <Divider width={1} style={{ margin: 50 }} />
      <Button
        text={"Add"}
        color={appColors.secondary}
        size={20}
        onPress={() => {
          Submit();
        }}
      />
      </ImageBackground>
    </SafeAreaView>
  );
}
