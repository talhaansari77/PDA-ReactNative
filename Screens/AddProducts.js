import { View, Text, SafeAreaView, Alert, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Input from "../Components/Auth/Input";
import Button from "../Components/Auth/Button";
import Title from "../Components/Auth/Title";
import * as ImagePicker from "expo-image-picker";
import ImageUploader from "../Components/Auth/ImageUploader";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { appColors } from "../assets/Colors/Colors";
import LottieView from "lottie-react-native";

export default function AddProducts() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState("");
  const [catList, setCatList] = useState([]);
  const menuId = useSelector(
    (state) => state.CreateUserReducer.activeUser.menuId
  );
  const shopId = useSelector(
    (state) => state.CreateUserReducer.activeUser.user.shopId
  );

  const Submit = async () => {
    if (
      title.length > 0 &&
      price.length > 0 &&
      description.length > 0 &&
      imageUrl.length > 0
    ) {
      setLoading(true);
      //form data for image upload
      const formdata = new FormData();
      const imgToUpload = {
        type: "image/jpeg",
        name: "ImageToUpload",
        uri: imageUrl,
      };
      formdata.append("picture", imgToUpload);
      formdata.append("title", title);
      formdata.append("price", price);
      formdata.append("description", description);
      formdata.append("catId", catId);
      formdata.append("shopId", shopId);
      formdata.append("menuId", menuId);

      await axios
        .post(Baseurl + "Products/Products.php", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          transformRequest: (data, headers) => {
            return formdata; // this is doing the trick
          },
        })
        .then((response) => {
          if (response.data.status) {
            setLoading(false);
            Alert.alert("Product Added");
            setTitle("");
            setPrice("");
            setDescription("");
            setImage("");
          } else {
            Alert.alert(response.data.Message);
          }
        });
    }else{
      Alert.alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    axios
      .get(Baseurl + "Categories/Category.php")
      .then((response) =>
        setCatList(response.data.filter((cat) => cat.menuId === menuId))
      );
  }, []);
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/images/bg-wallpaper5.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <Title text={"Add-Products"} />
        <Input
          value={title}
          placeholder={"Product Name"}
          onChangeText={(text) => setTitle(text)}
        />
        <Input
          value={price}
          placeholder={"Price"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPrice(text)}
        />
        <ImageUploader
          onPress={() => OpenImageLib(setImage)}
          image={imageUrl}
        />
        <Input
          value={description}
          placeholder={"Description"}
          onChangeText={(text) => setDescription(text)}
        />
        {/* Cat DropDown */}
        <Dropdown value={catId} setValue={setCatId} list={catList} />
        <Divider width={1} style={{ margin: 50 }} />
        <Button
          text={"Add"}
          color={appColors.secondary}
          size={20}
          onPress={Submit}
        />
        {loading ? (
          <View
            style={{
              backgroundColor: "black",
              position: "absolute",
              opacity: 0.6,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <LottieView
              style={{ height: 200 }}
              source={require("../assets/animations/progress-bar.json")}
              autoPlay
              speed={1}
            />
          </View>
        ) : (
          <></>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

export const OpenImageLib = async (setImageCase) => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // allowsEditing: true,
  });
  console.log(pickerResult);
  setImageCase(pickerResult.uri);
};

export const Dropdown = (props) => (
  <View
    style={{
      marginHorizontal: 20,
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 15,
      borderColor: "#878787",
    }}
  >
    <Picker
      style={{
        marginHorizontal: 20,
      }}
      selectedValue={props.value}
      onValueChange={(itemValue, itemIndex) => props.setValue(itemValue)}
    >
      {props.list.map((item, index) => (
        <Picker.Item label={item.name} value={item.id} key={index} />
      ))}
    </Picker>
  </View>
);
