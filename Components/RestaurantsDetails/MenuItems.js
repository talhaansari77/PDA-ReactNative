import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { appColors } from "../../assets/Colors/Colors";

export default function MenuItems({
  restaurantName,
  Food,
  hideCheckbox,
  marginleft,
  marginRight,
  placement = "none",
  onPressMinus,
  onPressPlus,
}) {
  const dispatch = useDispatch();
  const addItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        shopName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.id === food.id));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {Food.length>0? ( 
        Food.map((foodItem, index) => (
          <View key={index}>
            <View style={style.menuItemStyle}>
              {hideCheckbox ? (
                <></>
              ) : (
                <BouncyCheckbox
                  style={{ marginRight: 10 }}
                  size={20}
                  iconStyle={{ borderColor: "Lightgrey", borderRadius: 0 }}
                  fillColor={"green"}
                  onPress={(checkboxValue) => addItem(foodItem, checkboxValue)}
                  isChecked={isFoodInCart(foodItem, cartItems)}
                />
              )}
              {placement === "cart" ? (
                <FoodImage
                  image={foodItem}
                  marginRight={marginRight ? marginRight : 0}
                />
              ) : (
                <></>
              )}

              <FoodInfo
                food={foodItem}
                placement={placement}
                onPressMinus={() => onPressMinus(foodItem.id)}
                onPressPlus={() => onPressPlus(foodItem.id)}
              />
              {placement !== "cart" ? (
                <FoodImage
                  image={foodItem}
                  marginleft={marginleft ? marginleft : 0}
                />
              ) : (
                <></>
              )}
            </View>
            <Divider
              width={0.5}
              orientation={"vertical"}
              style={{ marginHorizontal: 20 }}
            />
          </View>
        ))
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 50,
          }}
        >
          <Text>No Item To Show</Text>
        </View>
      )}
    </ScrollView>
  );
}

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <View style={{flexDirection:"row", justifyContent: "space-between"}}>
    <Text style={[style.black, style.title]}>{props.food.title}</Text>
    {/* <FontAwesome5Icon style={{ marginRight: 50}} name="trash" size={20} color="red" /> */}
    </View>
    <Text style={style.black}>{props.food.description}</Text>

    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 10,
          alignItems: "center",
        }}
      >
        <Text style={style.black}>{props.food.price+ " pkr"}</Text>
        {/* plus Minus Button */}
        {props.placement === "cart" ? (
          <View style={{ flexDirection: "row", marginRight: 20 }}>
            {/* Minus */}
            <TouchableOpacity
              onPress={props.onPressMinus}
              activeOpacity={0.5}
              style={{
                borderWidth: 1,
                borderRadius: 50,
                alignSelf: "center",
                paddingHorizontal: 4,
                paddingVertical: 2,
                backgroundColor: appColors.black2,
              }}
            >
              <FontAwesome5Icon name={"minus"} size={15} color={appColors.primary} />
            </TouchableOpacity>
            <Text style={{ fontSize: 14, marginHorizontal: 10 }}>{props.food.qty}</Text>
            {/* Plus */}
            <TouchableOpacity
              onPress={props.onPressPlus}
              activeOpacity={0.5}
              style={{
                borderWidth: 1,
                borderRadius: 50,
                alignSelf: "center",
                paddingHorizontal: 4,
                paddingVertical: 2,
                backgroundColor: appColors.black2,
              }}
            >
              <FontAwesome5Icon name={"plus"} size={15} color={appColors.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    </>
  </View>
);
const FoodImage = (props) => (
  <View>
    <Image
      source={{ uri: props.image.imageUrl }}
      style={{
        height: 100,
        width: 100,
        borderRadius: 8,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
      }}
    />
  </View>
);

const style = StyleSheet.create({
  black: {
    color: "#000",
  },
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
  },
});
