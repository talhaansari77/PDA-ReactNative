import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Title from "../Components/Auth/Title";
import { useDispatch, useSelector } from "react-redux";
import MenuItems from "../Components/RestaurantsDetails/MenuItems";
import { useIsFocused } from "@react-navigation/native";
import ViewCart from "../Components/RestaurantsDetails/ViewCart";

export default function Cart({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { items, shopName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  console.log(items);

  const qtyPlusOne = (id) => {
    dispatch({
      type: "PLUS_QTY",
      payload: {
        id: id,
      },
    });
  };

  const qtyMinusOne = (id) => {
    dispatch({
      type: "MINUS_QTY",
      payload: {
        id: id,
      },
    });
  };

  useEffect(() => {
    console.log("cart reload");
  }, [items]);

  return (
    <View style={{ backgroundColor: "#eee", flex: 1 }}>
      <Title text={"Manage Cart"} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:110}}>
        <MenuItems
          Food={items}
          hideCheckbox={true}
          placement={"cart"}
          marginRight={20}
          onPressMinus={qtyMinusOne}
          onPressPlus={qtyPlusOne}
        />
      </ScrollView>
      {/* <ViewCart navigation={navigation} /> */}
    </View> 
  );
}
