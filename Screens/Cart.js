import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../Components/Auth/Title";
import { useDispatch, useSelector } from "react-redux";
import MenuItems from "../Components/RestaurantsDetails/MenuItems";
import { useIsFocused } from "@react-navigation/native";
import ViewCart from "../Components/RestaurantsDetails/ViewCart";
import Button from "../Components/Auth/Button";
import { appColors } from "../assets/Colors/Colors";
import LottieView from "lottie-react-native";

export default function Cart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { items, shopName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  console.log(items);

  const { user } = useSelector((state) => state.CreateUserReducer.activeUser);
  // console.log("cart->user");
  // console.log(user);
  // const { items, shopName } = useSelector(
  //   (state) => state.cartReducer.selectedItems
  // );
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalPKR = total.toFixed(2).toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  console.log("totalPKR");
  console.log(totalPKR);

  const addOrderToDataBase = () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        address: user.city,
        total: totalPKR,
      }),
    };

    if (user.email) {
      let orderId = "";
      fetch(Baseurl + "Orders/Orders.php", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status == true) {
            orderId = data.id;
            //cartData
            console.log(orderId, "<== This is ORderId");
            const cartItems = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId,
                selectedItems: items,
              }),
            };
            fetch(Baseurl + "OrderDetail/OrderDetail.php", cartItems)
              .then((response) => response.json())
              .then((data) => {
                if (data.status) {
                  console.log(data.Message);
                }
              });
          } else {
            console.log(data);
          }
        });
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
        navigation.navigate("OrderCompleted", { orderId, totalPKR });
      }, 2500);
    } else {
      setLoading(false);
      navigation.navigate("Login");
    }
  };

  const qtyPlusOne = (id) => {
    dispatch({
      type: "PLUS_QTY",
      payload: {
        id: id,
      },
    });
  };

  const qtyMinusOne = (id) => {
    dispatch({
      type: "MINUS_QTY",
      payload: {
        id: id,
      },
    });
  };

  useEffect(() => {
    console.log("cart reload");
  }, [items]);

  return (
    <View style={{ backgroundColor: "#eee", flex: 1 }}>
      <Title text={"Manage Cart"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 0 }}
      >
        <MenuItems
          Food={items}
          hideCheckbox={true}
          placement={"cart"}
          marginRight={20}
          onPressMinus={qtyMinusOne}
          onPressPlus={qtyPlusOne}
        />
      </ScrollView>
      {total ? (
        <View style={{ padding: 10 }}>
          <Button
            text={"Checkout"}
            color={appColors.black2}
            txtColor={"#fff"}
            size={20}
            onPress={() => addOrderToDataBase()}
          />
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
      {/* <ViewCart navigation={navigation} /> */}
    </View>
  );
}
