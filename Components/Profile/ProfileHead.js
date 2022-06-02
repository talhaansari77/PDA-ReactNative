import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { appColors } from "../../assets/Colors/Colors";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { userIcon } from "../CustomDrawer/CustomDrawer";
import { OpenImageLib } from "../../Screens/AddProducts";
import axios from "axios";
import Baseurl from "../Auth/Baseurl";
import { useSelector } from "react-redux";

export default function ProfileHead(props) {
  const [image, setImage] = useState("");
  const { id, picture } = useSelector(
    (state) => state.CreateUserReducer.activeUser.user
  );

  const UploadImage = () => {
    const formdata = new FormData();
    const imgToUpload = {
      type: "image/jpeg",
      name: "ImageToUpload",
      uri: image,
    };
    formdata.append("picture", imgToUpload);
    // formdata.append("name", "Test123");
    axios
      .post(
        `https://pda.dreamhosters.com/imageUploader.php?id=${id}&table=users`,
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
      .then((response) => console.log(response.data))
      .catch((error) => {
        Alert.alert("Something Went Wrong Please Try Again");
      });
    // console.log(formdata);
  };

  return (
    <View>
      <View
        style={{
          // backgroundColor: "#ffbd6d",
          height: Dimensions.get("window").height / 4,
          width: Dimensions.get("window").width,
          justifyContent: "center",
          // alignItems:"center"
        }}
      >
        <View
          style={{
            padding: 30,
            flexDirection: "row",
            marginTop: 30,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              OpenImageLib(setImage).then(() => {
                UploadImage();
              });
            }}
          >
            <Image
              source={{
                uri: image
                  ? image
                  : picture && picture != "image"
                  ? picture
                  : userIcon,
              }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
                marginLeft: -10,
              }}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: "center", marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#3f3f3f",
              }}
            >
              {props.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#3f3f3f",
              }}
            >
              {props.email}
            </Text>
          </View>
          <View style={{ justifyContent: "center", marginLeft: 20 }}>
            <FontAwesome5Icon
              name={"edit"}
              size={25}
              color={appColors.black2}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      </View>
      <Divider width={1} />
    </View>
  );
}
