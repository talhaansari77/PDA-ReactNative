import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({ onPress, ...props }) {
  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: props.color,
            padding: props.btnSize ? props.btnSize : 15,
            width: props.width?`${props.width}%`:"50%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 40,
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontSize: props.size,
              fontWeight: "bold",
              color: props.txtColor ? props.txtColor : "#3f3f3f",
            }}
          >
            {props.text}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const Link = ({ navigation, ...props }) => (
  <View>
    <View
      style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}
    >
      <Text style={{ color: "#969696" }}>{props.desc}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(props.pageName)}>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "darkorange",
            marginLeft: 10,
          }}
        >
          {props.link}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
