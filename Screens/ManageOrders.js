import {
  View,
  Text,
  ScrollView,
  Modal,
  BackHandler,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../Components/Auth/Title";
import axios from "axios";
import Baseurl from "../Components/Auth/Baseurl";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { ListItem } from "./History";
import OrderItem from "../Components/RestaurantsDetails/OrderItem";
import { Divider } from "react-native-elements";
import Button from "../Components/Auth/Button";
import LottieView from "lottie-react-native";
import { appColors } from "../assets/Colors/Colors";

var counterForReload = 0;

export default function ManageOrders({ navigation, route }) {
  const isFocused = useIsFocused();  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [counter, setCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageTitle, setPageTitle] = useState(route.params.title);

  const { shopId } = useSelector(
    (state) => state.CreateUserReducer.activeUser.user
  );
  // Orders LIst
  const GetOrders = async () => {
    setLoading(true);
    let orderStatus = SetOrderStatusForPage(route.params.title);
    console.log("This is page title", orderStatus);

    const response = await axios.post(
      Baseurl + "Orders/GetShopOrders.php",
      JSON.stringify({ shopId, status: orderStatus })
    );
    if (response.data.status) {
      setHistory(response.data.orders.reverse());
      setLoading(false);
    }
    console.log(history);

    console.log("History Reload");
  };
  //Orders Details
  const GetOrderList = async (orderId) => {
    setLoading(true);
    console.log(orderId, shopId, "<== 👉 IDS ");
    const response = await axios.get(
      Baseurl +
        `OrderDetail/OrderDetail.php?orderId=${orderId}&shopId=${shopId}`
    );
    if (response.data.status) {
      setOrderList(response.data.orders);
      console.log(response.data.orders);

      let gTotal = response.data.orders
        .map((item) => Number(item.price))
        .reduce((prev, curr) => prev + curr, 0);
      console.log(gTotal);
      setTotal(gTotal);
      setLoading(false);
    }
    // console.log(orderList);

    console.log("OrderList loaded");
  };

  // back to profile
  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Profile1");
  });

  useEffect(() => {
    if (isFocused) {
      GetOrders();
    }
  }, [isFocused, counterForReload]);
  return (
    <View>
      <ImageBackground
        source={require("../assets/images/bg-wallpaper5.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        {/* // Detail Modal */}
        <Modal
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          transparent={true}
        >
          {modalContent(
            orderList,
            email,
            total,
            route.params.title,
            setModalVisible
          )}
        </Modal>

        <Title text={route.params.title} />
        <ScrollView style={{ marginBottom: 10 }}>
          {history.length > 0 ? (
            history.map((item, index) => (
              <ListItem
                no={item.id}
                title={item.email}
                icon={"eye"}
                size={15}
                color={"#fff"}
                btntext={"View"}
                key={index}
                pathName={route.params.title}
                onPress={() => {
                  setEmail(item.email);
                  GetOrderList(item.id).then(() => setModalVisible(true));
                }}
              />
            ))
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>No Orders</Text>
            </View>
          )}
        </ScrollView>
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
            source={require("../assets/animations/progress-bar.json")}
            autoPlay
            speed={1}
            
          />
        </View>
      ) : (
        <></>
      )}
      </ImageBackground>
    </View>
  );
}

export const modalContent = (
  orderList = [],
  email,
  total = 0,
  pathName,
  setModalVisible
) => (
  <View
    style={{
      flex: 1,
      // justifyContent: "flex-start",
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: "80%",
        width: "90%",
        borderWidth: 1,
      }}
    >
      <Text
        style={{
          color: "#000",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        Customer : {email}
      </Text>
      <Divider width={1} />
      <ScrollView>
        {orderList.map((item, index) => (
          <OrderItem item={item} key={index} status={item.status} />
        ))}
      </ScrollView>
      {/*//! using this component for Total */}
      <View>
      <OrderItem
        item={{ title: "--- Total ---" }}
        status={total + " pkr"}
        underline={false}
      />
      </View>
      {pathName == "Pending-Orders" || pathName == "On-Way-Orders" ? (
        <Button
          text={"Update"}
          color={appColors.secondary}
          txtColor={"#fff"}
          size={15}
          btnSize={10}
          width={65}
          onPress={() =>
            UpdateOrderStatus(orderList, pathName, setModalVisible)
          }
        />
      ) : (
        <></>
      )}
    </View>
  </View>
);

const UpdateOrderStatus = async (orderList, pageTitle, setModalVisible) => {
  let orderStatus = SetOrderStatus(pageTitle);

  console.log(orderStatus, "<== The Order Status");

  const response = await axios.post(
    Baseurl + "OrderDetail/UpdateOrderDetail.php",
    JSON.stringify({ orderList, status: orderStatus })
  );
  if (response.data.status) {
    console.log("Order Status Updated");
    counterForReload += 1;
    setModalVisible(false);
  }
};

const SetOrderStatusForPage = (title) => {
  let orderStatus = "";

  if (title === "Pending-Orders") {
    orderStatus = "pending";
  } else if (title === "On-Way-Orders") {
    orderStatus = "onway";
  } else if (title === "Completed-Orders") {
    orderStatus = "completed";
  } else {
    orderStatus = "cancelled";
  }

  return orderStatus;
};
const SetOrderStatus = (title) => {
  let orderStatus = "";

  if (title === "Pending-Orders") {
    orderStatus = "onway";
  } else if (title === "On-Way-Orders") {
    orderStatus = "completed";
  } else if (title === "Completed-Orders") {
    orderStatus = "completed";
  } else {
    orderStatus = "cancelled";
  }

  return orderStatus;
};
