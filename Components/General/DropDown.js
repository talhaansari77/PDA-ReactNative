import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Menu, Divider } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { appColors } from "../../assets/Colors/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DropDown(props) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    // <Provider>
    <TouchableOpacity
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
      }}
      onPress={openMenu}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: appColors.black2,
            }}
          >
            {props.btnTitle}
          </Text>
        }
        contentStyle={{ padding: 10 }}
        style={{}}
      >
        {props.items.map((item, index) => (
          <Menu.Item
            onPress={item.onPress}
            key={index}
            title={item.title}
            titleStyle={{
              fontWeight: "bold",
              fontSize: 16,
              color: appColors.black2,
            }}
          />
        ))}
      </Menu>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FontAwesome5Icon
          name={props.icon}
          size={20}
          color={"#969696"}
          style={{ marginLeft: 10 }}
        />
      </View>
    </TouchableOpacity>
    // </Provider>
  );
}