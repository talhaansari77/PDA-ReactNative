import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../Components/Auth/Title";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../Components/Auth/Input";
import Button from "../Components/Auth/Button";
import Baseurl from "../Components/Auth/Baseurl";
import { useSelector, useDispatch } from "react-redux";

export default function CreateShop({ navigation }) {
  //shopId
  var shopId = "";
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [categoryName, setCategoryName] = useState("");
  var shopDetail = {
    title: title,
    phone: phone,
    address: address,
    categoryName: categoryName,
  };

  const fetchUser = () => {
    return useSelector((state) => state.CreateUserReducer.activeUser.user);
  };
  var user = fetchUser();

  const dispatch = useDispatch();
  const activateUser = (userDetail) => {
    dispatch({
      type: "CreateUser",
      payload: {
        ...userDetail,
        status: true,
      },
    });
  };

  const SubmitCreateShop = () => {
    fetch(Baseurl + "Shops/Shops.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopDetail),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          shopId = data.id;
          UpdateUser(shopId);
          // Creating Menu Here
          fetch(Baseurl + "Menus/Menus.php", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: title + " Menu",
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status) {
                UpdateShop(data.id, shopId);
                navigation.navigate("Profile1");
              } else {
                Alert.alert(data.Message);
              }
            });
          // Creating Menu Here
        } else {
          Alert.alert(data.Message);
        }
      });
  };

  // const CreateMenu = (ShopTitle, shopId) => {
  //   fetch(Baseurl + "Menus/Menus.php", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: ShopTitle + " Menu",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status) {
  //         UpdateShop(data.id, shopId);
  //       } else {
  //         console.log(data.Message);
  //       }
  //     });
  // };

  const UpdateShop = (menuId, id) => {
    fetch(Baseurl + "Shops/UpdateShop.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...shopDetail, menuId: menuId, id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Alert.alert("Your Shop Is Successfully Created.");
      });
  };

  const UpdateUser = (shopId) => {
    // newShop Id
    user.shopId = shopId;
    fetch(Baseurl + "Users/UpdateUser.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          activateUser(user);
        } else {
          console.log(data.Message);
        }
      });
  };

  const Validate = () => {
    if (
      title.length > 0 &&
      phone.length > 0 &&
      address.length > 0 &&
      categoryName.length > 0
    ) {
      SubmitCreateShop();
      // CreateMenu(title, shopId);
      // Alert.alert("Your Shop Is Successfully Created.");
    } else {
      Alert.alert("Please Fill All Fields");
    }
  };

  return (
    <View>
      <Title text={"Create-Shop"} />
      <View style={{ height: "55%" }}>
        <Input
          placeholder="Shop Title"
          // keyboardType="email-address"
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <Input
          placeholder="Phone Number"
          keyboardType="numeric"
          onChangeText={(text) => {
            setPhone(text);
          }}
        />
        <Input
          placeholder="Category"
          // keyboardType="email-address"
          onChangeText={(text) => {
            setCategoryName(text);
          }}
        />
        <Input
          placeholder="Shop Address"
          // keyboardType="email-address"
          onChangeText={(text) => {
            setAddress(text);
          }}
        />
      </View>
      <View>
        <Button
          size={20}
          color={"orange"}
          text={"Create"}
          onPress={() => Validate()}
        />
      </View>
    </View>
  );
}
