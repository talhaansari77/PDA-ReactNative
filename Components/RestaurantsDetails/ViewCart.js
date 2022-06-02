import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch as dispatch } from "react-redux";
import OrderItem from "./OrderItem";
import LottieView from "lottie-react-native";
import Baseurl from "../Auth/Baseurl";
import { appColors } from "../../assets/Colors/Colors";
// import firebase from '../../firebase';

export default function ViewCart({ navigation }) {
  const { user } = useSelector((state) => state.CreateUserReducer.activeUser);
  // console.log("cart->user");
  // console.log(user);
  const { items, shopName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
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
    
      let orderId='';
      fetch(Baseurl + "Orders/Orders.php", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status == true) {
            orderId=data.id;
            //cartData
            console.log(orderId,"<== This is ORderId");
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
          }else{
            console.log(data);
          }
        });
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
        navigation.navigate("OrderCompleted",{orderId, totalPKR});
      }, 2500);
    } else {
      setLoading(false);
      navigation.navigate("Login");
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkOutModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{shopName}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
          </ScrollView>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text style={{color: "green",fontWeight:'bold' }}>{totalPKR}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                alignItems: "center",
                padding: 13,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
              onPress={() => {
                addOrderToDataBase();
                setModalVisible(false);
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
              <Text
                style={{
                  position: "absolute",
                  right: 20,
                  color: "white",
                  fontSize: 15,
                  top: 17,
                }}
              >
                {total ? "$" + totalPKR : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
     
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        {checkOutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 60,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("cart1")}
              activeOpacity={0.8}
              style={{
                backgroundColor: appColors.black2,
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20, marginRight: 60 }}>
                ViewCart
              </Text>
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {"pkr " +  parseInt(totalPKR)}
              </Text>
            </TouchableOpacity>
          </View>
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
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: 500,
    borderWidth: 1,
  },

  restaurantName: {
    color: "#000",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },

  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  subtotalText: {
    color: "#000",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
});
