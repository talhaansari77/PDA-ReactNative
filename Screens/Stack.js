import OrderCompleted from "./OrderCompleted";
import RestaurantsDetail from "./RestaurantsDetail";
import WelcomeScreen from "./WelcomeScreen";
import MainDrawer from "./Drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import React from "react";
import Cart from "./Cart";

export default function Stack() {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName="WelcomeScreen"  screenOptions={screenOptions}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Home1" component={MainDrawer} />
      <Stack.Screen name="RestaurantsDetail" component={RestaurantsDetail} />
      <Stack.Screen name="cart1" component={Cart} />
      <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
    </Stack.Navigator>
  );
}
