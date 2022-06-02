import { View, Text, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import About from "../Components/RestaurantsDetails/About";
import { Divider } from "react-native-elements/dist/divider/Divider";
import MenuItems from "../Components/RestaurantsDetails/MenuItems";
import ViewCart from "../Components/RestaurantsDetails/ViewCart";
import axios from "axios";
import Baseurl from "../Components/Auth/Baseurl";

export default function RestaurantsDetail({ route, navigation }) {
  const [Food, setFood] = useState([]);

    // back to profile
    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   navigation.navigate("Profile1");
    // });

  useEffect(() => {
    axios
      .get(Baseurl + "Products/GetProducts.php?menuId=" + route.params.shopId)
      .then((res) => setFood(res.data));
  }, []);

  return (
    <View style={{ backgroundColor: "#eee", flex: 1 }}>
      <About route={route} />
      {/* <Divider width={1.8} style={{marginVertical:20}}/> */}
      {route.params.pda ? (
        <MenuItems restaurantName={route.params.name} Food={Food} />
      ) : (
        <></>
      )}

      <ViewCart navigation={navigation} restaurantName={route.params.name} />
    </View>
  );
}