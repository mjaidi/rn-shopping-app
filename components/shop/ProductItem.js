import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

import MainText from "../UI/MainText";
import Card from "../UI/Card";

const ProductItem = ({ title, price, image, onSelect, children }) => {
  let Touchable = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <Touchable style={styles.touchable} onPress={onSelect} useForeground>
        <View style={styles.touchable}>
          <Image style={styles.image} source={{ uri: image }} />
          <View styles={styles.titleWrapper}>
            <MainText numberOfLines={1} style={styles.title} bold>
              {title}
            </MainText>
            <MainText style={styles.price}>${price.toFixed(2)}</MainText>
          </View>

          <View style={styles.actions}>{children}</View>
        </View>
      </Touchable>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  touchable: {
    width: "100%",
    height: "100%",
  },
  product: {
    height: 300,
    marginVertical: 15,
    marginHorizontal: 10,
    width: "45%",
  },
  image: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  titleWrapper: {
    height: "20%",
  },
  title: {
    fontSize: 18,
    marginVertical: 3,
    textAlign: "center",
  },
  price: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  actions: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
