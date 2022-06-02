import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { appColors } from "../../assets/Colors/Colors";
export default function ImageUploader({ image, ...props }) {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} {...props}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
            marginTop: 15,
            borderColor: "#878787",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                width: "100%",
                padding: 5,
                marginLeft: 20,
                color: appColors.black2,
                opacity: 0.5,
              }}
            >
              Upload
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  height: 30,
                  width: 30,
                  marginRight: 10,
                  borderRadius: 5,
                }}
              />
            ) : (
              <FontAwesome5Icon
                name={"image"}
                size={20}
                color={"#969696"}
                style={{ marginRight: 10 }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
