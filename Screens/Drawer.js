import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../Components/CustomDrawer/CustomDrawer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Auth from "./Auth";
import Home from "./Home";
import Cart from "./Cart";
import History from "./History";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, LogBox } from "react-native";
import HomeTabs from "./HomeTabs";
import OrderCompleted from "./OrderCompleted";
import SellerNavs from "./SellerNavs";
import { useSelector } from "react-redux";
import SellerSignup from "./SellerSignup";
import { CurrentLocation } from "../Components/General/CurrentLocation";
import { appColors } from "../assets/Colors/Colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function MainDrawer() {
  const Drawer = createDrawerNavigator();
  const [locationText, setLocationText] = useState("");
  
  // var status = false;
  const status = useSelector(
    (state) => state.CreateUserReducer.activeUser.user.status
  );
  useEffect(() => {
    CurrentLocation(setLocationText);
    LogBox.ignoreLogs(["Require cycle:"]);
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} locationText={locationText} status={status} />
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#3f3f3f",
        drawerActiveBackgroundColor: appColors.secondary,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
      initialRouteName={"Home"}
    >
      <Drawer.Screen
        name="Home"
        initialParams={{ locationText: locationText }}
        component={HomeTabs}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Become Seller"
        component={SellerSignup}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="store" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={SellerNavs}
        options={{
          drawerItemStyle: { height: status ? "13%" : 0 },
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="user" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          drawerItemStyle: { height: 0 },
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="shopping-cart" size={22} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="OrderCompleted"
        component={OrderCompleted}
        options={{
          drawerItemStyle: { height: 0 },
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="receipt" size={22} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="receipt" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Auth}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="lock" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Exit"
        component={CloseApp}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5Icon name="arrow-left" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const screenOptions = {
  headerShown: false,
};

const CloseApp = () => BackHandler.exitApp();
