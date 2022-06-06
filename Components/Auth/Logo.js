import { View, Text } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { appColors } from "../../assets/Colors/Colors";

export default function Logo(props) {
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop:100
        }}
      >
        <View
          style={{
            borderWidth: 5,
            borderColor: appColors.secondary,
            borderRadius: 500,
            width: "65%",
            height: 240,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5
            style={{}}
            name={props.name}
            color={props.color}
            size={props.size}
          />
        </View>
          {/* <Text style={{fontSize:40,fontWeight:"700",color:"darkorange"}}>{props.text}</Text> */}
      </View>
    </View>
  );
}
