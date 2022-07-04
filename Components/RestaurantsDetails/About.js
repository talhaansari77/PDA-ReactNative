import {
  View,
  Text,
  Image,
  Platform,
  Linking,
  Button,
  Dimensions,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

export const makeCall = (number) => {
  let phone = "";
  if (Platform.OS === "android") {
    phone = `tel:${number}`;
  } else {
    phone = `telpromptt:${number}`;
  }

  Linking.openURL(phone);
};

export default function About(props) {
  console.log("first");
  console.log(props.route.params.image);
  // npx react-native run-android
  const { name, image, price, reviews, rating, phone, mapMaker, address } =
    props.route.params;

  // const formattedcategories = categories.map(cat => cat.title).join(' · ');

  const description = ` ${
    price ? " · " + price : ""
  } · 🎟️ ·${rating}🌟(${reviews}+) `;

  return (
    <View>
      <ScrollView horizontal={true} pagingEnabled={true}>
        {image !== "images" ? (
          image.map((item, index) => (
            <RestauaruntImage image={item} key={index} />
          ))
        ) : (
          <></>
        )}
      </ScrollView>
      {/* <RestauaruntImage image={image[0]} /> */}
      <RestauaruntTitle title={name} />
      <RestauaruntDescription description={description} />
      {/* Shop Address */}
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Text>{address.split("             ")[0]}</Text>
      </View>
      {/* Dialer */}
      {!props.route.params.pda ? (
        phone ? (
          <RestauaruntDialer phone={phone} />
        ) : (
          <View
            style={{
              margin: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>No Contact info</Text>
          </View>
        )
      ) : (
        <></>
      )}
    </View>
  );
}

const RestauaruntImage = (props) => (
  <Image
    source={{ uri: props.image }}
    style={{ width: Dimensions.get("window").width, height: 250 }}
  />
);
const RestauaruntTitle = (props) => (
  <Text
    style={{
      color: "#000",
      marginTop: 10,
      marginHorizontal: 15,
      fontSize: 25,
      fontWeight: "600",
    }}
  >
    {props.title}
  </Text>
);

const RestauaruntDescription = (props) => (
  <Text
    style={{
      color: "#000",
      marginTop: 10,
      marginHorizontal: 15,
      fontSize: 14,
    }}
  >
    {props.description}
  </Text>
);
const RestauaruntDialer = (props) => (
  <View
    style={{
      margin: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>{props.phone}</Text>
    </View>
    <View style={{ width: 100 }}>
      <Button
        title="Call"
        color="green"
        onPress={() => makeCall(props.phone)}
      />
    </View>
  </View>
);
