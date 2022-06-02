import { TabRouter } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

export default function OrderItem({ item, status = "checkout", underline=TabRouter }) {
  const { title, price } = item;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderBottomWidth:underline? 1:0,
        borderBottomColor: "#999",
      }}
    >
      <View>
        <Text style={{ fontWeight: "600", fontSize: 16, color: "#000" }}>
          {title}
        </Text>
        <Text style={{ opacity: 0.7, fontSize: 13, color: "green",fontWeight:'bold' }}>
          {price}
        </Text>
      </View>
      {/* <View><Text>- - - -</Text></View> */}
      <View>
        {status ? (
          <Text
            style={{
              opacity: 0.7,
              fontSize: 14,
              fontWeight: "bold",
              justifyContent:"center",
              alignItems:"center",
              marginTop:5,
              color: status=='pending'?"darkorange":status=='delivered' ?"green":status=='cancelled'?"red":status=='checkout'?"blue":'orange',
            }}
          >
            {status}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
