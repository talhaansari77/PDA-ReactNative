import { Text, View } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function SearchBar({ sHandler, navigation }) {
  const [myPlaceholder, setMyPlaceholder] = React.useState("Search");
  const [keyword, setKeyword] = React.useState("");
  return (
    <View
      style={{
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <Searchbar
        placeholder="Search"
        style={{ width: "100%",borderRadius:50 }}
        onChangeText={(text) => setKeyword(text)}
        onEndEditing={() => sHandler(keyword)}
        // icon={"menu"}
        onIconPress={() => navigation.openDrawer()}
      />
    </View>
  );
}

{
  /* <TextInput */
}
// query={{key:"AIzaSyATiAqIXBARofRD2apZcPQ1eEWZPH4fPV4"}}
// placeholder="Search"
// style={{
//   borderWidth: 1,
//   width: '100%',
//   borderRadius: 20,
//   color: '#000',
//   paddingHorizontal: 20,
//   fontWeight: '500',
//   fontSize: 20,
// }}
//! onChangeText={text => setKeyword(text)}
//! onEndEditing={() => cityHandler(keyword)}
//! defaultValue={myPlaceholder}
//! onPressIn={() => setMyPlaceholder('')}
//! onPress={(data, detail=null)=>{
//!   console.log(data.description);
//!   const city = data.description.split(",")[0];
//!   cityHandler(city);
//! }}
// styles={{

//   textInput: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     fontWeight: '700',
//     marginTop: 7,
//     color: '#000',
//   },
//   textInputContainer: {
//     backgroundColor: '#eee',
//     flexDirection: 'row',
//     borderRadius: 50,
//     alignItems: 'center',
//     marginRight: 10,
//   },
// }}
// renderLeftButton={() => (
//   <View style={{marginLeft: 10}}>
//     <Ionicons name="location-sharp" size={24} color={"#000"}/>
//     {/* <FontAwesome5 name={"map-marked"} size={24} color={"red"} /> */}
//   </View>
// )}
// renderRightButton={() => (
//   <View
//     style={{
//       marginLeft: 10,
//       flexDirection: 'row',
//       marginRight: 10,
//       alignItems: 'center',
//       height:40,
//       width:80,
//       backgroundColor:"#fff",
//       borderRadius:30

//     }}>
//     <AntDesign name="clockcircle" color={"#000"} size={18} style={{marginHorizontal:6}} />
//     <Text style={{color:"black",
//     fontWeight: '600',}}>Search</Text>
//   </View>
// )}
// />
