import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import ListHeader from "../Components/General/ListHeader";
import { Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import Title from "../Components/Auth/Title";
import LottieView from "lottie-react-native";

export default function ManageProducts({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const menuId = useSelector(
    (state) => state.CreateUserReducer.activeUser.menuId
  );
  const getProducts = () => {
    setLoading(true);
    fetch(Baseurl + "Products/Products.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.filter((item) => item.menuId === menuId));
        setLoading(false);
      });

    console.log(products[0]);
  };

  // back to profile
  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Profile1");
  });
  // mount data on load
  React.useEffect(() => {
    getProducts();
  }, []);
  return (
    <View>
      <ImageBackground
        source={require("../assets/images/bg-wallpaper5.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        {/* <ListHeader title={"ManageProducts"} size={25} /> */}
        <Title text="Manage Products" />

        <ScrollView
          // refreshControl={
          //   <RefreshControl refreshing={true} onRefresh={getProducts()} />
          // }
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10 }}
        >
          {products.map((product, index) => (
            <ProductView
              id={product.id}
              title={product.title}
              price={product.price}
              desc={product.description}
              img={product.imageUrl}
              items={items}
              key={index}
              navigation={navigation}
            />
          ))}
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

const ProductView = (props) => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate("ProductDetail", { id: props.id })}
    style={{
      marginHorizontal: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 5,
      marginTop: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    }}
    activeOpacity={0.8}
  >
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Image
        style={{ height: 100, width: 120, borderRadius: 10 }}
        source={{
          uri: props.img,
        }}
      />
      <View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ marginVertical: 3, marginHorizontal: 10, width: "75%" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {props.title}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 80,
            }}
          >
            {/* <TouchableOpacity>
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            marginVertical: 0,
            marginHorizontal: 10,
            width: "60%",
            height: 38,
          }}
        >
          <Text>{props.desc}</Text>
        </View>
        <View style={{ marginVertical: 5, marginHorizontal: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginLeft: 90 }}>
            {"pkr:" + props.price}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
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
