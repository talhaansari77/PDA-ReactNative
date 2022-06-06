import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function Map({ lat, lng }) {
  console.log(lat, "🖐 here is the lat");
  console.log(lng, "🖐 here is the lat");
  const region = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0000,
    longitudeDelta: 0.0031,
  };

  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.map} >
      <Marker
  coordinate={{ latitude : lat , longitude : lng }}
  // image={{uri: 'custom_pin'}}
/>
      </MapView>
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
