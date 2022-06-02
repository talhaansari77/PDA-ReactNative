import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../Components/Auth/Input";
import axios from "axios";
import Baseurl from "../Components/Auth/Baseurl";
import { useSelector } from "react-redux";
import Button from "../Components/Auth/Button";
import { Dropdown, OpenImageLib } from "./AddProducts";
import Title from "../Components/Auth/Title";
import ImageUploader from "../Components/Auth/ImageUploader";
import { Divider } from "react-native-elements/dist/divider/Divider";

const emptyImage =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg";

export default function ProductDetail({ route, navigation }) {
  const pId=route.params.id;
  const [productDetail, setProductDetail] = useState({});
  const [imageUrl, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState("");
  const [catList, setCatList] = useState([]);
  // getting shop data from redux
  const menuId = useSelector(
    (state) => state.CreateUserReducer.activeUser.menuId
  );
  const shopId = useSelector(
    (state) => state.CreateUserReducer.activeUser.user.shopId
  );
  //   const UploadImage = () => {
  //     const formdata = new FormData();
  //     const imgToUpload = {
  //       type: "image/jpeg",
  //       name: "ImageToUpload",
  //       uri: imageUrl,
  //     };
  //     formdata.append("picture", imgToUpload);
  //     // formdata.append("name", "Test123");
  //     axios
  //       .post(
  //         `https://pda.dreamhosters.com/imageUploader.php?id=${shopDetail.id}&table=shops`,
  //         formdata,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //           transformRequest: (data, headers) => {
  //             return formdata; // this is doing the trick
  //           },
  //         }
  //       )
  //       .then((response) => console.log(response.data))
  //       .catch((error) => {
  //         Alert.alert("Something Went Wrong Please Try Again");
  //       });
  //     // console.log(formdata);
  //   };

  const DeleteProduct = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pId }),
    };

    fetch(Baseurl + "Products/DeleteProduct.php", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          navigation.navigate("ManageProducts");
        } else {
          Alert.alert(data.Message);
        }
      });
  }
  const Submit = async () => {
    if (
      title.length > 0 &&
      price.length > 0 &&
      description.length > 0 &&
      imageUrl.length > 0
    ) {
      //form data for image upload
      const formdata = new FormData();
      const imgToUpload = {
        type: "image/jpeg",
        name: "ImageToUpload",
        uri: imageUrl,
      };
      formdata.append("picture", imgToUpload);
      formdata.append("id", productDetail.id);
      formdata.append("title", title);
      formdata.append("price", price);
      formdata.append("description", description);
      formdata.append("catId", catId);
      formdata.append("shopId", shopId);
      formdata.append("menuId", menuId);

      await axios
        .post(Baseurl + "Products/UpdateProduct.php", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          transformRequest: (data, headers) => {
            return formdata; // this is doing the trick
          },
        })
        .then((response) => {
          if (response.data.status) {
            navigation.navigate("ManageProducts");
          } else {
            Alert.alert(response.data.Message);
          }
        });
    } else {
      Alert.alert("Please fill all the fields");
    }
  };
  
  useEffect(() => {
    //   dropdown data
    axios
      .get(Baseurl + "Categories/Category.php")
      .then((response) =>
        setCatList(response.data.filter((cat) => cat.menuId === menuId))
      );
    //   product detail
    axios
      .get(Baseurl + "Products/Products.php?id=" + route.params.id)
      .then((response) => {
        setProductDetail(response.data);
        setCatId(response.data.catId);
        setImage(response.data.imageUrl ? response.data.imageUrl : emptyImage);
        setTitle(response.data.title);
        setPrice(response.data.price);
        setDescription(response.data.description);
        // show in console
        console.log(response.data);
      });
  }, []);

  return (
    <SafeAreaView>
      <Title text={"Edit-Product"} />
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
      <ImageUploader onPress={() => OpenImageLib(setImage)} image={imageUrl} />
      <Input
        value={description}
        placeholder={"Description"}
        onChangeText={(text) => setDescription(text)}
      />
      {/* Cat DropDown */}
      <Dropdown value={catId} setValue={setCatId} list={catList} />
      <Divider width={1} style={{ margin: 50 }} />
      <Button text={"Save"} color={"darkorange"} size={20} onPress={Submit} />

      <Button
        text={"Delete"}
        color={"red"}
        size={20}
        onPress={DeleteProduct}
      />
    </SafeAreaView>
  );
}
