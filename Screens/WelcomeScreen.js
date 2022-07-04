import { Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

export default function WelcomeScreen({navigation}) {
  return (
    <Onboarding
    onSkip={()=>navigation.navigate("Home1")}
    onDone={()=>navigation.navigate("Home1")}
      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/images/bread.png")}  style={{height:250,width:250}} />,
          title: "Welcome",
          subtitle: "Everyone Is Welcome To Join Us",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/images/coffee.png")} style={{height:250,width:250}} />,
          title: "Lets Get Going",
          subtitle: "All In One Place",
        },
      ]}
    />
  );
}
