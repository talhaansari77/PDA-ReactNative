import { View, Text } from 'react-native'
import React from 'react'
import { Divider } from "react-native-elements/dist/divider/Divider";

export default function Title(props) {
  return (
    
        <>
          <View style={{ paddingVertical: 30, paddingVertical: 30, paddingHorizontal:20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{props.text}</Text>
            <Divider width={1} style={{ marginTop: 10 }} />
          </View>
          {/* <Divider width={0.2} style={{ marginTop: 10 }} /> */}
        </>
      
  )
}