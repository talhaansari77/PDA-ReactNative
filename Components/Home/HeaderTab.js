import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

export default function HeaderTab(props) {



  return (
    <View style={{flexDirection: 'row', alignSelf: 'center',marginTop:20}}>
      <HeaderTabs
        text="Delivery"
        textColor="#fff"
        bgColor="#000"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderTabs
        text="Pickup"
        textColor="#000"
        bgColor="#fff"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

const HeaderTabs = props => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? "#000" : "#fff",
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 30,
    }}
    onPress={() => props.setActiveTab(props.text)}>
    <Text style={{color:props.activeTab === props.text ? "#fff" : "#000", fontSize: 15, fontWeight: '900'}}>
      {props.text}
    </Text>
  </TouchableOpacity>
);
