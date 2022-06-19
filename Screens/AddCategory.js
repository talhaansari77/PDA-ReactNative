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
import LottieView from "lottie-react-native";


export default function AddCategory() {
  const [category, setCategory] = useState("");  
  const [loading, setLoading] = useState(false);
  const menuId = useSelector(
    (state) => state.CreateUserReducer.activeUser.menuId
  );

  const Submit = () => {
    if (category.length > 0) {
      setLoading(true);
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
            setLoading(false);
            Alert.alert("Category Added");
            setCategory("");
          } else {
            Alert.alert(response.data.Message);
          }
        });
    }else{
      Alert.alert("Please fill all the fields");
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
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../assets/animations/progress-bar.json")}
            autoPlay
            speed={1}
            
          />
        </View>
      ) : (
        <></>
      )}
      </ImageBackground>
    </SafeAreaView>
  );
}
