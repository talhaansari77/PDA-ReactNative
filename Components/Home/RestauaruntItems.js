import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Dimensions,
  SkeletonContent,
} from "react-native";

import Categories from "./Categories";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { netConnection } from "../General/connection";
import LottieView from "lottie-react-native";
import Demo from "../../Screens/Demo";
import { appColors } from "../../assets/Colors/Colors";

export default function RestauaruntItems({ navigation, ...props }) {
  const [netStatus, setNetStatus] = useState({ type: "", isConnected: false });
  const [redHeart, setRedHeart] = useState(false);
  const [counter, setCounter] = useState(0);

  const LoadMore = () => {
    let newload = props.load + 10;
    props.setLoad(newload);
    console.log(props.load);
  };

  useEffect(() => {
    netConnection(setNetStatus);
    // if (setNetStatus.isConnected) {
    props.getDataFromApi(props.load);
    // }
  }, [props.load]);

  return (
    <>
      {props.isLoading ? (
        <View
          style={{
            height: Dimensions.get("window").height,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {netStatus.isConnected ? (
            <Demo />
          ) : (
            <Text style={{ fontWeight: "bold", color: "#fff" }}>
              No Internet Connection
            </Text>
          )}
        </View>
      ) : (
        <FlatList
          data={props.restaurantData}
          keyExtractor={(item, index) => index.toString()}
          // ListHeaderComponent={() => <Categories />}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginBottom: 30 }}
              onPress={() =>
                navigation.navigate("RestaurantsDetail", {
                  shopId: item.id,
                  name: item.title,
                  image: props.pda ? [item.imageUrls] : item.imageUrls,
                  price: item.price,
                  reviews: item.reviewsCount,
                  rating: item.totalScore,
                  address: item.address,
                  phone: item.phone,
                  mapMarker: item.url,
                  pda: props.pda ? props.pda : false,
                  lat: item.location.lat,
                  lng: item.location.lng,
                })
              }
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  marginTop: 10,
                  padding: 15,
                  left: 20,
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RestauaruntImage
                  image={props.pda ? item.imageUrls : item.imageUrls[0]}
                  redHeart={redHeart}
                  setRedHeart={setRedHeart}
                  pda={props.pda ? props.pda : false}
                />
                <RestauaruntInfo name={item.title} rating={item.totalScore} />
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={() => LoadMore()}
              style={{
                backgroundColor: "#eee",
                padding: 15,
                alignSelf: "center",
                marginBottom: 180,
                borderRadius: 20,
                width: "30%",
                alignItems: "center",
              }}
            >
              <View>
                {props.isLoadingMore ? (
                  // <LottieView
                  //   style={{ height: 30 }}
                  //   source={require("../../assets/animations/progress-bar.json")}
                  //   autoPlay
                  //   speed={1}
                  // />
                  <ActivityIndicator color={appColors.secondary} size={19} />
                ) : (
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "#3f3f3f",
                    }}
                  >
                    Load More
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
          // refreshControl={<RefreshControl  />}
        />
        // props.restaurantData.map((item, index) => (
        //   <TouchableOpacity
        //     key={index}
        //     activeOpacity={0.8}
        //     style={{marginBottom: 30}}
        //     onPress={() =>
        //       navigation.navigate('RestaurantsDetail', {
        //         name: item.title,
        //         image: item.imageUrls[0],
        //         price: item.price,
        //         reviews: item.reviewsCount,
        //         rating: item.totalScore,
        //       })
        //     }>
        //     <View style={{backgroundColor: '#fff', marginTop: 10, padding: 15}}>
        //       <RestauaruntImage image={item.imageUrls[0]} />
        //       <RestauaruntInfo name={item.title} rating={item.totalScore} />
        //     </View>
        //   </TouchableOpacity>
        // ))
      )}
    </>
  );
}

const RestauaruntImage = (props) => (
  <>
    <Image
      source={{ uri: props.image }}
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity
      onPress={() =>
        props.redHeart ? props.setRedHeart(false) : props.setRedHeart(true)
      }
      style={{ position: "absolute", right: 20, top: 20 }}
    >
      {props.pda ? (
        <MaterialCommunityIcons
          name={props.redHeart ? "heart" : "heart-outline"}
          size={40}
          color={props.redHeart ? "red" : "#fff"}
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  </>
);

const RestauaruntInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View style={{ width: "70%" }}>
      <Text style={{ color: "#000", fontWeight: "900", fontSize: 15 }}>
        {props.name}
      </Text>
      <Text style={{ color: "#000", fontSize: 13 }}>30-45 . min</Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 30,
        width: 40,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#000", fontSize: 13 }}>
        {parseInt(props.rating) > 0 ? props.rating : "0"}
      </Text>
    </View>
  </View>
);

export const RestauaruntList = [
  {
    image_url: "https://www.businesslist.pk/img/cats/restaurants.jpg",
    name: " FarmHouse Kitchen in Pak",
    reviews: 789,
    rating: 4.3,
    price: "89$",
  },
  {
    image_url: "https://www.businesslist.pk/img/cats/restaurants.jpg",
    name: " FarmHouse Kitchen in Pak 2",
    reviews: 789,
    rating: 4.2,
    price: "89$",
  },
  {
    image_url: "https://www.businesslist.pk/img/cats/restaurants.jpg",
    name: " FarmHouse Kitchen in Pak 3",
    reviews: 789,
    rating: 4.9,
    price: "89$",
  },
  {
    image_url: "https://www.businesslist.pk/img/cats/restaurants.jpg",
    name: " FarmHouse Kitchen in Pak 4",
    reviews: 789,
    rating: 4.7,
    price: "89$",
  },
  {
    image_url: "https://www.businesslist.pk/img/cats/restaurants.jpg",
    name: " FarmHouse Kitchen in Pak 5",
    reviews: 789,
    rating: 4.1,
    price: "89$",
  },
  {
    image_url: "https://www.businesslist.pk/img/cats/restaurants.jpg",
    name: " FarmHouse Kitchen in Pak",
    reviews: 789,
    rating: 4.1,
    price: "89$",
  },
  {
    image_url: "https://www.businesslist.pk/img/cats/restaurants.jpg",
    name: " FarmHouse Kitchen in Pak",
    reviews: 789,
    rating: 4.1,
    price: "89$",
  },
];
