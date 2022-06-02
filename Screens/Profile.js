import { View, Text, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import React from "react";
import ProfileHead from "../Components/Profile/ProfileHead";
import ProfileNav from "../Components/Profile/ProfileNav";
import DropDown from "../Components/General/DropDown";
// import { Divider } from "react-native-elements/dist/divider/Divider";
import { useSelector } from "react-redux";
import Button from "../Components/Auth/Button";
import { Provider } from "react-native-paper";

export default function Profile({ navigation, route }) {
  const { name, email, shopId, type } = useSelector(
    (state) => state.CreateUserReducer.activeUser.user
  );
  const items = [
    {
      title: "Products",
      onPress: () => {
        navigation.navigate("ManageProducts");
      },
    },
    {
      title: "Categories",
      onPress: () => {
        navigation.navigate("ManageCategories");
      },
    },
  ];
  const ordersMenu = [
    {
      title: "Pending-Orders",
      onPress: () => {
        navigation.navigate("ManageOrders",{title:'Pending-Orders'});
      },
    },
    {
      title: "On-Way-Orders",
      onPress: () => {
        navigation.navigate("ManageOrders",{title:'On-Way-Orders'});
      },
    },
    {
      title: "Completed-Orders",
      onPress: () => {
        navigation.navigate("ManageOrders",{title:'Completed-Orders'});
      },
    },
  ];
  return (
    <Provider>
      <ImageBackground
        source={require("../assets/images/bg-wallpaper6.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
      <SafeAreaView>
        <ProfileHead name={name} email={email} />
        {/* My Profile */}
        <Title />
        {/* Creat Shop First */}
        {/* if (type != "regular"){} */}
        {(shopId == null || shopId == 0) && type == "seller" ? (
          <View
            style={{ marginTop: 30, height: "50%", justifyContent: "center" }}
          >
            <Button
              text={"Create Shop"}
              size={25}
              color={"#ffe0b2"}
              onPress={() => navigation.navigate("CreateShop")}
            />
          </View>
        ) : type == "seller" ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 30 }}
          >
            <ProfileNav
              name={"Add Product"}
              navigation={navigation}
              path={"AddProducts"}
              icon={"plus"}
            />
            <ProfileNav
              name={"Add Category"}
              navigation={navigation}
              path={"AddCategory"}
              icon={"plus"}
            />

            <DropDown items={items} icon={"plus"} btnTitle={"Manage"} />
            <DropDown items={ordersMenu} icon={"receipt"} btnTitle={"Manage Orders"}  />
            {/* <Divider width={1} style={{ margin: 15 }} /> */}
            {/* <ProfileNav
              name={"Manage Orders"}
              icon={"receipt"}
              navigation={navigation}
              path={"ManageOrders"}
            /> */}
            <ProfileNav
              name={"My Shop"}
              icon={"store"}
              navigation={navigation}              
              path={"ShopDetail"}
            />
          </ScrollView>
        ) : (
          <></>
        )}
        {/* Seller Option */}
      </SafeAreaView>
      </ImageBackground>
    </Provider>
  );
}

const Title = () => (
  <View
    style={{
      alignItems: "center",
    }}
  >
    <View
      style={{
        backgroundColor: "#fff",
        padding: 15,
        width: "90%",
        borderRadius: 20,
        borderColor: "#eee",
        position: "absolute",
        top: -30,
        zIndex: 99,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>My Profile</Text>
    </View>
  </View>
);
