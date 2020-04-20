import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, View, StyleSheet, Image, Button } from "react-native";
import * as cartActions from "../../store/actions/cart";

import colors from "../../constants/colors";
import MainText from "../../components/UI/MainText";

const ProductDetailScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((p) => p.id === productId)
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title="Add to Cart"
          color={colors.primary}
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
        />
      </View>
      <View>
        <MainText style={styles.price}>${selectedProduct.price}</MainText>
        <MainText style={styles.description}>
          {selectedProduct.description}
        </MainText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "justify",
    marginHorizontal: 15,
  },
  actions: {
    alignItems: "center",
    marginVertical: 10,
  },
});

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

export default ProductDetailScreen;
