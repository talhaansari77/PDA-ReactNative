import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { appColors } from "../../assets/Colors/Colors";

export default function ProfileNav({navigation, ...props}) {
  return (
    <View>
      <TouchableOpacity
      onPress={()=>navigation.navigate(props.path)}
      activeOpacity={0.7}
        style={{
          marginHorizontal: 20,
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 10,
          padding: 15,
          marginTop: 15,
          borderColor: "#878787",
          justifyContent: "space-between",
          backgroundColor: "#eee", 
          // opacity:0.9
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: appColors.black2,
            }}
          >
            {props.name}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FontAwesome5Icon
            name={props.icon}
            size={20}
            color={"#969696"}
            style={{ marginLeft: 10 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
