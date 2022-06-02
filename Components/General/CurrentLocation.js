import { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";

export async function CurrentLocation(setText) {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission not granted",
      "Allow the app to use location service.",
      [{ text: "OK" }],
      { cancelable: false }
    );
  }

  let { coords } = await Location.getCurrentPositionAsync();

  if (coords) {
    const { latitude, longitude } = coords;
    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    for (let item of response) {
      let address = `${item.district}, ${item.city}, ${item.region}, ${item.country}`;

      console.log(address, "<== address");
      console.log(response, "<== response");
      setText(address);
    }
    console.log(coords, "<== coords");
  }
}


