import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../Components/Auth/Title";
import axios from "axios";
import LottieView from "lottie-react-native";
import Baseurl from "../Components/Auth/Baseurl";
import { useSelector } from "react-redux";

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const { shopId } = useSelector(
    (state) => state.CreateUserReducer.activeUser.user
  );

  const GetOrders = async () => {
    setLoading(true);
    // let orderStatus = SetOrderStatusForPage(route.params.title);
    // console.log("This is page title", orderStatus);

    const response = await axios.get(Baseurl + "OrderDetail/OrderDetail.php");
    if (response.data.length > 0) {
      setHistory(
        response.data
          .filter(
            (order) => order.status === "completed" && order.shopId === shopId
          )
          .reverse()
      );
      setLoading(false);
    }
    console.log(history);

    console.log("History Reload");

    
  };

  useEffect(() => {
    GetOrders();
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/images/bg-wallpaper5.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <Title text={"Sales Report"} />
        {/* <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 18,
            // elevation: 5,
            // borderRadius: 10,
            padding: 10,
            // backgroundColor: "#ffffff",
          }}
        >
          <Text style={{ fontSize: 15 }}>No</Text>
          <Text style={{ fontSize: 20 }}>Product</Text>
          <Text style={{ fontSize: 15 }}>Qty</Text>
          <Text style={{ fontSize: 15 }}>Price</Text>
        </View> */}
        <ScrollView>
          {history.length > 0 ? (
            history.map((item, index) => (
              <ResportComponent
                key={index}
                no={index + 1}
                title={item.title}
                qty={item.qty}
                price={item.price}
              />
            ))
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>No Orders</Text>
            </View>
          )}
        </ScrollView>
        {/* Showing Monthly Total */}
        <ShowTotalComponent
          value={history
            .map((item) => Number(item.price.replace("pkr", "")))
            .reduce((prev, curr) => prev + curr, 0)}
        />
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
    </SafeAreaView>
  );
}

const ResportComponent = (props) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 18,
      elevation: 5,
      borderRadius: 10,
      padding: 10,
      backgroundColor: "#ffffff",
      marginBottom: 10,
    }}
  >
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>#{props.no}</Text>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>
        {props.title}
      </Text>
    </View>
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.price}</Text>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginHorizontal: 5 }}>
        x
      </Text>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.qty}</Text>
    </View>
  </View>
);

const ShowTotalComponent = ({ value }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 18,
      marginBottom: 10,
      padding: 10,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    }}
  >
    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total</Text>
    <Text style={{ fontSize: 16, fontWeight: "bold" }}>pkr {value}</Text>
  </View>
);
