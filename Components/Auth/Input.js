import { View, Text, TextInput } from "react-native";
import React from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function Input({ iconname, ...props }) {
  return (
    <View>
      <View
        style={{
          marginHorizontal: 20,
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 10,
          padding: 5,
          marginTop: 15,
          borderColor: "#878787",
          backgroundColor:"#fff"
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FontAwesome5Icon
            name={iconname}
            size={20}
            color={"#969696"}
            style={{ marginLeft: 10 }}
          />
        </View>
        <View>
          <TextInput
            style={{ fontSize: 20, width: "100%", padding: 5, marginLeft: 10 }}
            {...props}
          
          />
        </View>
      </View>
    </View>
  );
}
