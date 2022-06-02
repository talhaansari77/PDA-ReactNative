import OrderCompleted from "./OrderCompleted";
import RestaurantsDetail from "./RestaurantsDetail";
import MainDrawer from "./Drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Cart from "./Cart";

export default function Stack() {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName="Home1" screenOptions={screenOptions}>
      <Stack.Screen name="Home1" component={MainDrawer} />
      <Stack.Screen name="RestaurantsDetail" component={RestaurantsDetail} />
      <Stack.Screen name="cart1" component={Cart} />
      <Stack.Screen name="OrderCompleted" component={OrderCompleted} /> 
    </Stack.Navigator>
  );
}
