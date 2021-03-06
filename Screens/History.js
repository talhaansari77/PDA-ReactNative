import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../Components/Auth/Title";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import Baseurl from "../Components/Auth/Baseurl";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { modalContent } from "./ManageOrders";
import LottieView from "lottie-react-native";

export default function History({ navigation }) {
  const isFocused = useIsFocused();
  // const [counter, setCounter] = useState(0);  
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { email } = useSelector(
    (state) => state.CreateUserReducer.activeUser.user
  );

  const GetOrders = async () => {
    setLoading(true);

    const response = await axios.post(
      Baseurl + "Orders/GetOrders.php",
      JSON.stringify({ email: email })
    );
    if (response.data.status) {
      setHistory(response.data.orders);
      setLoading(false);
    }
    console.log(history);

    console.log("History Reload");
  };

  // setInterval(() => {
  //   setCounter(counter + 1);
  // }, 5000);
  const GetOrderList = async (orderId) => {
    setLoading(true);

    const response = await axios.get(
      Baseurl + `OrderDetail/OrderDetail.php?orderId=${orderId}`
    );
    if (response.data.status) {
      setOrderList(response.data.orders);

      let gTotal = response.data.orders
        .map((item) => Number(item.price))
        .reduce((prev, curr) => prev + curr, 0);
      setTotal(gTotal);
      setLoading(false);
    }
    console.log(orderList);

    console.log("OrderList loaded");
  };
  useEffect(() => {
    if (isFocused) {
      GetOrders();
    }
  }, [isFocused]);

  return (
    
    <View style={{flex:1}}>
      <ImageBackground
        source={require("../assets/images/bg-wallpaper5.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        // transparent={true}
      >
        {/* <Title text="Order Details" /> */}
        {modalContent(orderList, email, total)}
      </Modal>
      <Title text="History" />
      <ScrollView style={{ marginBottom: 10 }}>
        {history.length > 0 ? (
          history.map((item, index) => (
            <ListItem
              no={item.id}
              title={item.date}
              icon={"receipt"}
              size={15}
              color={"#fff"}
              btntext={"View"}
              key={index}
              onPress={() => {
                GetOrderList(item.id).then(() => setModalVisible(true));
              }}
            />
          ))
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>No History</Text>
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

export const ListItem = (props) => (
  <View
    style={{
      marginVertical: 5,
      marginHorizontal: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 8,
        paddingVertical: 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{fontWeight:"bold"}}>{'#'+props.no }</Text>
        <Text style={{ marginLeft: 20 }}>{props.title}</Text>
      </View>

      {/* View Button */}
      <ViewButton
        onPress={props.onPress}
        icon={props.icon}
        size={props.size}
        color={props.color}
        btntext={props.btntext}
      />
    </View>
  </View>
);

const ViewButton = ({ btntext, onPress, icon, color, size }) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
    <View
      style={{
        backgroundColor: icon === "trash" ? "red" : "darkorange",
        padding: 5,
        flexDirection: "row",
        borderRadius: 5,
      }}
    >
      {/* <View> */}
      <FontAwesome5Icon name={icon} size={size} color={color} />
      {/* </View> */}
      <Text
        style={{
          marginLeft: icon === "trash" ? 0 : 5,
          fontWeight: "bold",
          fontSize: 12,
        }}
      >
        {btntext}
      </Text>
    </View>
  </TouchableOpacity>
);
