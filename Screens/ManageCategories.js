import {
  Alert,
  BackHandler,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { List } from "react-native-paper";
import ListHeader from "../Components/General/ListHeader";
import { useSelector } from "react-redux";
import Title from "../Components/Auth/Title";
import { ListItem } from "./History";

export default function ManageCategories({ navigation }) {
  const [categories, setCategories] = React.useState([]);
  const menuId = useSelector(
    (state) => state.CreateUserReducer.activeUser.menuId
  );

  const getCategories = () => {
    fetch(Baseurl + "Categories/Category.php")
      .then((response) => response.json())
      .then((data) =>
        setCategories(data.filter((item) => item.menuId === menuId))
      );

    console.log(categories);
  };

  const DeleteCategory = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };

    fetch(Baseurl + "Categories/DeleteCategory.php", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          getCategories();
        } else {
          Alert.alert(data.Message);
        }
      });
  };
  // back to profile
  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Profile1");
  });
  // mount data on load
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/images/bg-wallpaper5.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
      <List.Section>
        <Title text="Manage Categories" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 100 }}
        >
          {categories.map((category, index) => (
            <ListItem
              title={category.name}
              color={"#fff"}
              icon={"trash"}
              size={20}
              key={index}
              no={index}
              onPress={() => DeleteCategory(category.id)}
            />
          ))}
        </ScrollView>
      </List.Section>
      </ImageBackground>
    </SafeAreaView>
  );
}
