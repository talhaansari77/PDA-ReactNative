import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../Components/Auth/Input";
import axios from "axios";
import Baseurl from "../Components/Auth/Baseurl";
import { useSelector } from "react-redux";
import Button from "../Components/Auth/Button";
import { OpenImageLib } from "./AddProducts";
import { appColors } from "../assets/Colors/Colors";

const emptyImage =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg";

export default function ShopDetail({ navigation }) {
  const [shopDetail, setShopDetail] = useState({});
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // getting shop data from redux
  const shopId = useSelector(
    (state) => state.CreateUserReducer.activeUser.user.shopId
  );
  const UploadImage = () => {
    const formdata = new FormData();
    const imgToUpload = {
      type: "image/jpeg",
      name: "ImageToUpload",
      uri: imageUrl,
    };
    formdata.append("picture", imgToUpload);
    // formdata.append("name", "Test123");
    axios
      .post(
        `https://pda.dreamhosters.com/imageUploader.php?id=${shopDetail.id}&table=shops`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          transformRequest: (data, headers) => {
            return formdata; // this is doing the trick
          },
        }
      )
      .then((response) => ToastAndroid.show("Image Uploaded", ToastAndroid.SHORT))
      .catch((error) => {
        Alert.alert("Something Went Wrong Please Try Again");
      });
    // console.log(formdata);
  };

  const Submit = async () => {
    if (
      title.length > 0 &&
      phone.length > 0 &&
      categoryName.length > 0 &&
      address.length > 0
    ) {
      const postData = JSON.stringify({
        title,
        phone,
        address,
        categoryName,
        id: shopId,
        menuId: shopDetail.menuId,
      });

      await axios
        .post(Baseurl + "Shops/UpdateShop.php", postData)
        .then((response) => {
          if (response.data.status) {
            0;
            navigation.navigate("ShopDetail");
            Alert.alert("Shop Updated Successfully");
          } else {
            Alert.alert(response.data.Message);
          }
        });
    } else {
      Alert.alert("Please fill all the fields");
    }
  };
  useEffect(() => {
    axios.get(Baseurl + "Shops/Shops.php?id=" + shopId).then((response) => {
      setShopDetail(response.data);
      setTitle(response.data.title);
      setPhone(response.data.phone);
      setAddress(response.data.address);
      setCategoryName(response.data.categoryName);
      console.log(response.data);
    });
  }, []);

  return (
    <View>
       <ImageBackground
        source={require("../assets/images/bg-wallpaper5.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onLongPress={() =>
            OpenImageLib(setImageUrl).then(() => {
              imageUrl ? UploadImage() : console.log("Image Upload Cencelled");
            })
          }
        >
          <Image
            source={{
              uri: imageUrl
                ? imageUrl
                : shopDetail.imageUrls
                ? shopDetail.imageUrls
                : emptyImage,
            }}
            style={{ height: 200, width: "100%" }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10, height: "55%" }}>
        <ScrollView>
          <Text style={{ marginHorizontal: 20, marginTop: 15 }}>Title</Text>
          <Input
            value={title}
            placeholder="Shop Title"
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
          <Text style={{ marginHorizontal: 20, marginTop: 15 }}>Contact</Text>
          <Input
            value={phone}
            placeholder="Phone Number"
            keyboardType="numeric"
            onChangeText={(text) => {
              setPhone(text);
            }}
          />
          <Text style={{ marginHorizontal: 20, marginTop: 15 }}>Category</Text>
          <Input
            value={categoryName}
            placeholder="Category"
            // keyboardType="email-address"
            onChangeText={(text) => {
              setCategoryName(text);
            }}
          />
          <Text style={{ marginHorizontal: 20, marginTop: 15 }}>Address</Text>
          <Input
            value={address}
            placeholder="Shop Address"
            // keyboardType="email-address"
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
        </ScrollView>
      </View>
      {/* spacer */}
      <View style={{ marginTop: 20 }}></View>

      <View>
        <Button
          size={20}
          color={appColors.secondary}
          text={"Save"}
          onPress={() => Submit()}
        />
      </View>
      </ImageBackground>
    </View>
  );
}
