import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./Screens/Stack";
import Stack2nd from "./Screens/Stack2nd";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = configureStore();

export default function RootNavigation() {
  const [isFirstLauch, setIsFirstLauch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLauch(true);
      } else {
        setIsFirstLauch(false);
      }
    });
  }, []);

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        {isFirstLauch === true ? <Stack /> : <Stack2nd />}
      </NavigationContainer>
    </ReduxProvider>
  );
}
