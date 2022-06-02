import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import MenuItems from "../Components/RestaurantsDetails/MenuItems";
import axios from "axios";

const order = [
  {
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqcvXpWtWNJvt0Epg5Q3WMeQys4DkqHe6Tw&usqp=CAU",
    description: "This is the Best Food Item in The World You Must Try This🔥",
    title: "Kabab",
    price: "25.5$",
  },
];

export default function OrderCompleted({ navigation, route }) {
  const [tempReceipt, setTempReceipt] = useState([]);
  const dispatch = useDispatch();

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalPKR = total.toFixed(2).toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const loadBookedOrders = async () => {
    const response = await axios.get(
      Baseurl + `OrderDetail/OrderDetail.php?orderId=${route.params.orderId}`
    );
    setTempReceipt(response.data.orders);
    console.log(tempReceipt, "<== This is TempReceipt");
  };

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Home1");
  });

  useEffect(() => {
    dispatch({ type: "DELETE_CART" });
    loadBookedOrders();
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 15, alignItems: "center", height: "100%" }}>
        <LottieView
          source={require("../assets/animations/check-mark.json")}
          speed={0.5}
          loop={false}
          autoPlay
          style={{
            height: 100,
            alignSelf: "center",
            marginBottom: 30,
          }}
        />
        <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
          Your Order is Placed for 
          {/* Your Order at {restaurantName} is Placed for {route.params.totalPKR} */}
        </Text>
        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{route.params.totalPKR}</Text>
        <ScrollView>
          <MenuItems Food={tempReceipt} hideCheckbox={true} marginleft={15} />

          <LottieView
            source={require("../assets/animations/cooking.json")}
            speed={0.5}
            autoPlay
            style={{
              height: 150,
              alignSelf: "center",
              marginBottom: 30,
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
