import React, { useState } from "react";
import { Provider } from "react-redux";
import * as Font from "expo-font"; // package included in exp but you can load it using expo install expo-font
import { AppLoading } from "expo"; // wait for font fetching to complete before loading app

import store from "./store";

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

import ShopNavigator from "./navigation/shopNavigator";

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
