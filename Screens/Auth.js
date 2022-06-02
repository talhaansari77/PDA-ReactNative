import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login";
import Signup from "./Signup";
import SellerSignup from "./SellerSignup";

export default function Auth() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="LoginUser" screenOptions={screenOptions}>
      <Stack.Screen name="LoginUser" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SellerSignup" component={SellerSignup} />
    </Stack.Navigator>
  );
}


const screenOptions = {
    headerShown: false,
  };
  