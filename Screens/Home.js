import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderTab from "../Components/Home/HeaderTab";
import SearchBar from "../Components/Home/SearchBar";
import RestauaruntItems, {
  RestauaruntList,
} from "../Components/Home/RestauaruntItems";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { appColors } from "../assets/Colors/Colors";
import { useSelector } from "react-redux";

const Yelp_Api_Key =
  "P6Rlkv877Y8-f8lsHO2s_XB9g1UcQyDg1H5SMh7gburCmOXwMUTUZ4sFoNQTbWNSgSomdUo8tXJGHFUaYOucDhGkpEbT4kacwua8qhQc1rmGilKfruSuW6hC8aAkYnYx";

export default function StackHome({ navigation, route }) {
  //   title: "Saad Restaurant",
  //   price: null,
  //   menu: null,
  //   address:
  //     "231 B, Model Town, Gujranwala, Punjab, Pakistan             231 B، ماڈل ٹاؤن، گوجرانوالہ, گوجرانوالا, پنجاب",
  //   categoryName: "Restaurant",
  //   website: null,
  //   phone: "+92 321 6201594",
  //   temporarilyClosed: false,
  //   location: {
  //     lat: 32.1681636,
  //     lng: 74.1824712,
  //   },
  //   permanentlyClosed: false,
  //   url: "https://www.google.com/maps/place/Saad+Restaurant/@32.1681636,74.1802825,17z/data=!3m1!4b1!4m5!3m4!1s0x391f2920ca4f61b5:0x78d74720f0879bff!8m2!3d32.1681564!4d74.1824568?hl=en",

  //   imageUrls: [
  //     "https://lh5.googleusercontent.com/p/AF1QipMItuJkjogchH6uEUxMQ6rKxTF-FlE4MQhjFc4H=w1920-h1080-k-no",
  //     "https://lh5.googleusercontent.com/p/AF1QipNdRv4GIf2P12OgxRTT-MOsLHDTD9Nr40Dnisnc=w1920-h1080-k-no",
  //     "https://lh5.googleusercontent.com/p/AF1QipOnh4EZrsmLz50LAIJCRFe6UGLzzHB6FOMsg9dY=w1920-h1080-k-no",
  //     "https://lh5.googleusercontent.com/p/AF1QipNpgrNNkb0HsXfMf9wfQe5VZHXfkATtDXQDS2ds=w1920-h1080-k-no",
  //   ],
  //   totalScore: 5,
  //   reviewsCount: 3,
  const [restaurantData, setRestaurantData] = useState(RestauaruntList);
  const [searchTerm, setSearchTerm] = useState("Punjab");
  // const [activeTab, setActiveTab] = useState("Delivery");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [load, setLoad] = useState(10);
  const { items } = useSelector((state) => state.cartReducer.selectedItems);

  const getDataFromApi = (load, s = searchTerm) => {
    setIsLoadingMore(true);
    s = s ? s: "Punjab";
    load = s !=="Punjab" ? 999: load;
    s = s.replace(/^\s+|\s+$/gm, "").toLowerCase();

    const MapsApi = route.params.baseUrl + load;
    console.log(MapsApi, "🖐 --Here");

    return fetch(MapsApi)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setRestaurantData(
          responseJson.filter((shop) =>
            (shop.imageUrls && shop.address.toLowerCase().includes(s)) ||
            (shop.imageUrls && shop.title.toLowerCase().includes(s))
              ? shop
              : ""
          )
        );
        setIsLoading(false);
        setIsLoadingMore(false);
        console.log("Loading", route.params.locationText, "<==");
      });
  };

  useEffect(() => {
    getDataFromApi(load);
    console.log(searchTerm);
  }, [searchTerm, items]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/background-3.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 35,
            alignItems: "center",
            paddingHorizontal: 30,
            // paddingEnd: 20,
          }}
        >
          <View style={{ padding: 10 }}>
            <FontAwesome5Icon
              size={30}
              color="#a2a2bd"
              style={{ width: 20 }}
              // icon={"bars"}
              name="bars"
              // onIconPress={() => console.log("first")}
              onPress={() => navigation.openDrawer()}
            />
          </View>
          <Image
            source={require("../assets/images/splash-logo.png")}
            style={{ height: "100%", width: "60%" }}
          />
          <TouchableOpacity activeOpacity={0.7}>
            <FontAwesomeIcon
              size={25}
              name="shopping-cart"
              onPress={() => navigation.navigate("Cart")}
            />
            <CartItemCounter items={items} />
          </TouchableOpacity>
        </View>
        {/* <View style={{height:10}}></View> */}
        <View style={{ padding: 16 }}>
          <SearchBar sHandler={setSearchTerm} navigation={navigation} />
        </View>

        <View>
          <RestauaruntItems
            restaurantData={restaurantData}
            navigation={navigation}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            setIsLoading={setIsLoading}
            getDataFromApi={getDataFromApi}
            load={load}
            setLoad={setLoad}
            pda={route.params.pda}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export const CartItemCounter = ({ items }) =>
  items.length > 0 ? (
    <View
      style={{
        position: "absolute",
        left: 20,
        top: -5,
        backgroundColor: appColors.secondary,
        borderRadius: 20,
        padding: 2,
        width: 22,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: appColors.black2,
          fontSize: 10,
        }}
      >
        {items.length}
      </Text>
    </View>
  ) : (
    <></>
  );
