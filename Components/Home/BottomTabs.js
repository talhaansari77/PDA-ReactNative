import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function BottomTabs({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,
        justifyContent: 'space-between',
      }}>
      <Icon name="home" color={'#000'} size={25} text={'Restaurants'} />
      <Icon name="search" color={'#000'} size={25} text={'Browse'} />
      <Icon name="shopping-bag" color={'#000'} size={25} text={'Grocery'} navigation={navigation}/>
      <Icon name="receipt" color={'#000'} size={25} text={'Order'} />
      <Icon name="user" color={'#000'} size={25} text={'Account'} />
    </View>
  );
}

const Icon = ({navigation, ...props}) => (
  <TouchableOpacity onPress={()=>navigation.navigate(props.text)}>
    <View>
      <FontAwesome5
        style={{marginBottom: 3, alignSelf: 'center'}}
        name={props.name}
        size={props.size}
        color={props.color}
      />
      <Text style={{color: '#000'}}>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
