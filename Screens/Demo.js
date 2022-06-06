import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Animated, Platform } from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

// type Props = {};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.circleAnimatedValue = new Animated.Value(0);
  }
  circleAnimated = () => {
    this.circleAnimatedValue.setValue(0);
    Animated.timing(this.circleAnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        this.circleAnimated();
      }, 1000);
    });
  };
  componentDidMount() {
    this.circleAnimated();
  }
  render() {
    const translateX = this.circleAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 100],
    });

    const translateX2 = this.circleAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 270],
    });
    const translateX3 = this.circleAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 90],
    });
    return (
      <View style={styles.container}>
        <View style={[, styles.card]}>
          <View
            style={{
              marginTop: 10,
              padding: 15,
              left: 10,
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 270,
                height: 180,
                backgroundColor: "#ECEFF1",
                overflow: "hidden",
                // marginRight: 16,
              }}
            >
              <Animated.View
                style={{
                  width: "30%",
                  opacity: 0.5,
                  height: "100%",
                  backgroundColor: "white",
                  transform: [{ translateX: translateX2 }],
                }}
              ></Animated.View>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 130,
                height: 30,
                left: 25,
                marginBottom: 10,
                backgroundColor: "#ECEFF1",
                overflow: "hidden",
                marginRight: 16,
              }}
            >
              <Animated.View
                style={{
                  width: "30%",
                  opacity: 0.5,
                  height: "100%",
                  backgroundColor: "white",
                  transform: [{ translateX: translateX2 }],
                }}
              ></Animated.View>
            </View>

            <View
              style={{
                width: 30,
                height: 30,
                left: -20,
                // marginTop: 20,
                marginBottom: 10,
                borderRadius: 20,
                backgroundColor: "#ECEFF1",
                overflow: "hidden",
                marginRight: 16,
              }}
            >
              <Animated.View
                style={{
                  width: "30%",
                  opacity: 0.5,
                  height: "100%",
                  backgroundColor: "white",
                  transform: [{ translateX: translateX }],
                }}
              ></Animated.View>
            </View>
          </View>
        </View>

        <View style={[{ marginTop: 20 }, styles.card]}>
          <View
            style={{
              marginTop: 10,
              padding: 15,
              left: 10,
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 270,
                height: 180,
                backgroundColor: "#ECEFF1",
                overflow: "hidden",
                // marginRight: 16,
              }}
            >
              <Animated.View
                style={{
                  width: "30%",
                  opacity: 0.5,
                  height: "100%",
                  backgroundColor: "white",
                  transform: [{ translateX: translateX2 }],
                }}
              ></Animated.View>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 130,
                height: 30,
                left: 25,
                marginBottom: 10,
                backgroundColor: "#ECEFF1",
                overflow: "hidden",
                marginRight: 16,
              }}
            >
              <Animated.View
                style={{
                  width: "30%",
                  opacity: 0.5,
                  height: "100%",
                  backgroundColor: "white",
                  transform: [{ translateX: translateX2 }],
                }}
              ></Animated.View>
            </View>

            <View
              style={{
                width: 30,
                height: 30,
                left: -20,
                marginBottom: 10,
                borderRadius: 20,
                backgroundColor: "#ECEFF1",
                overflow: "hidden",
                marginRight: 16,
              }}
            >
              <Animated.View
                style={{
                  width: "30%",
                  opacity: 0.5,
                  height: "100%",
                  backgroundColor: "white",
                  transform: [{ translateX: translateX }],
                }}
              ></Animated.View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#ECEFF1",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    // padding: 10,
    shadowColor: "black",
    borderRadius: 4,
    backgroundColor: "#FAFAFA",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    // flexDirection: "row",
  },
});
