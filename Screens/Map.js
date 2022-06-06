import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: "100%",
    // left: 180,
    // height: 10,
    // padding: 20,
    // marginHorizontal: 20,
    // paddingHorizontal: 10,
    // paddingV
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").height / 2.8,
  },
});
