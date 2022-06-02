import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderTab from "../Components/Home/HeaderTab";
import SearchBar from "../Components/Home/SearchBar";
import RestauaruntItems, {
  RestauaruntList,
} from "../Components/Home/RestauaruntItems";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

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
  const [load, setLoad] = useState(10);

  const getDataFromApi = (load, s = searchTerm) => {
    s = s ? s : "Punjab";
    s = s.replace(/^\s+|\s+$/gm, "").toLowerCase();

    const MapsApi = route.params.baseUrl + load;
    console.log(MapsApi,"🖐 --Here");

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
        console.log("Loading", route.params.locationText, "<==");
      });
  };

  useEffect(() => {
    getDataFromApi(load);
    console.log(searchTerm);
  }, [searchTerm]);

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
            marginTop: 50,
            alignItems: "center",
            paddingHorizontal: 30,
            // paddingEnd: 20,
          }}
        >
          <FontAwesome5Icon
            size={30}
            color="#a2a2bd"
            style={{ width: 20 }}
            // icon={"bars"}
            name="bars"
            // onIconPress={() => console.log("first")}
            onPress={() => navigation.openDrawer()}
          />
          <Image
            source={require("../assets/images/splash-logo.png")}
            style={{ height: "100%", width: "60%" }}
          />
          <FontAwesomeIcon
            size={25}
            name="cart-arrow-down"
            onPress={() => navigation.navigate("Cart")}
          />
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
