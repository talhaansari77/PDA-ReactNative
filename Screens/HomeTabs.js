import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import StackHome, { CartItemCounter } from "./Home";
import { appColors } from "../assets/Colors/Colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Baseurl from "../Components/Auth/Baseurl";
import BottomTabs from "../Components/Home/BottomTabs";
import Button from "../Components/Auth/Button";
import SearchBar from "../Components/Home/SearchBar";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function HomeTabs({ navigation, route }) {
  const restaurantsUrl = Baseurl + "RestaurantsGRW/GetRestaurants.php?limit=";
  const pharmacyUrl = Baseurl + "PharmacyGRW/GetPharmacy.php?limit=";
  const pdaShop = Baseurl + "Shops/GetShops.php?limit=";
  const { items } = useSelector((state) => state.cartReducer.selectedItems);

  console.log(route.params.locationText, "route.params.locationText");

  useEffect(() => {}, [items]);

  const MainNavigator = () => (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/background-3.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 35,
            alignItems: "center",
            paddingHorizontal: 30,
            // paddingEnd: 20,
          }}
        >
          <View style={{ padding: 10 }}>
            <FontAwesome5Icon
              size={25}
              color="#a2a2bd"
              style={{ width: 20 }}
              // icon={"bars"}
              name="bars"
              // onIconPress={() => console.log("first")}
              onPress={() => navigation.openDrawer()}
            />
          </View>
          <Image
            source={require("../assets/images/splash-logo.png")}
            style={{ height: "100%", width: "60%" }}
          />
          <TouchableOpacity activeOpacity={0.7} >
            <FontAwesomeIcon
              size={25}
              name="shopping-cart"
              onPress={() => navigation.navigate("Cart")}
            />
            <CartItemCounter items={items} />
          </TouchableOpacity>
        </View>
        {/* <View style={{height:10}}></View> */}
        <View style={{ padding: 16 }}>
          <SearchBar navigation={navigation} />
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 16,
              marginTop: 20,
              marginHorizontal: 20,
            }}
          >
            <View style={{ height: 300, width: "50%" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PdaMall", {
                    baseUrl: pdaShop,
                    pda: true,
                  })
                }
                activeOpacity={0.9}
                style={{
                  backgroundColor: "#fff",
                  height: 300,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                  marginTop: 5,
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <FontAwesome5Icon name="store" size={30} color={"brown"} />
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      padding: 5,
                    }}
                  >
                    PDA MALL
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/*  */}
            <View style={{ width: 10 }}></View>
            {/*  */}
            <View style={{ height: 300, width: "50%" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Restaurants", {
                    baseUrl: restaurantsUrl,
                  })
                }
                activeOpacity={0.9}
                style={{
                  backgroundColor: "#fff",
                  height: 150,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <FontAwesome5Icon
                    name="pizza-slice"
                    size={30}
                    color={"orange"}
                  />
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      padding: 5,
                    }}
                  >
                    Restauarunts
                  </Text>
                </View>
              </TouchableOpacity>
              {/*  */}
              <View style={{ height: 10 }}></View>
              {/*  */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Pharmacy", {
                    baseUrl: pharmacyUrl,
                  })
                }
                activeOpacity={0.9}
                style={{
                  backgroundColor: "#fff",
                  height: 150,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <FontAwesome5Icon name="pills" size={30} color={"#ff6df5"} />
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      padding: 5,
                    }}
                  >
                    Pharmacy
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName={"PdaMall"}
    >
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      <Stack.Screen
        initialParams={{
          baseUrl: restaurantsUrl,
          locationText: route.params.locationText,
        }}
        name="Restaurants"
        component={StackHome}
      />
      <Stack.Screen
        initialParams={{
          baseUrl: pdaShop,
          pda: true,
          locationText: route.params.locationText,
        }}
        name="PdaMall"
        component={StackHome}
      />
      <Stack.Screen
        initialParams={{
          baseUrl: pharmacyUrl,
          locationText: route.params.locationText,
        }}
        name="Pharmacy"
        component={StackHome}
      />
    </Stack.Navigator>
  );
}
