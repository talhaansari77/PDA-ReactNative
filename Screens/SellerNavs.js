import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import AddProducts from "./AddProducts";
import AddCategory from "./AddCategory";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import CreateShop from "./CreateShop";
import ManageCategories from "./ManageCategories";
import ShopDetail from "./ShopDetail";
import ProductDetail from "./ProductDetail";
import EditProfile from "./EditProfile";
import Reports from "./Reports";


export default function SellerNavs({navigation}) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="" screenOptions={screenOptions}>
      <Stack.Screen name="Profile1" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddProducts" component={AddProducts} />
      <Stack.Screen name="AddCategory" component={AddCategory} />
      <Stack.Screen name="ManageOrders" navigation={navigation} component={ManageOrders} />      
      <Stack.Screen name="CreateShop" component={CreateShop} />
      {/* subMenus */}
      <Stack.Screen name="ManageCategories" component={ManageCategories} />
      <Stack.Screen name="ManageProducts" component={ManageProducts} />
      {/* <Stack.Screen name="OnWayOrders" component={ManageProducts} />
      <Stack.Screen name="CompletedOrders" component={ManageProducts} /> */}
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
      <Stack.Screen name="Reports" component={Reports} />
      
    </Stack.Navigator>
  );
}

const screenOptions = {
  headerShown: false,
};
