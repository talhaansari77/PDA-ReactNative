import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { List } from "react-native-paper";

export default function ListItem({ onPress, ...props }) {
  return (
    <List.Item    
      title={props.title}
      right={() => (
        <TouchableOpacity onPress={onPress}>
          <List.Icon icon={props.icon} color={props.color} />
        </TouchableOpacity>
      )}
      left={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 15 }}>{props.counting}</Text>
        </View>
      )}
      titleStyle={{ fontSize: props.size }}
      //   style={{ marginHorizontal: 20 }}
    />
  );
}
