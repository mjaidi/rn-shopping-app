import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

import IconButton from "../../components/UI/IconButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";
import MainText from "../../components/UI/MainText";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(undefined);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const { navigation } = props;

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    await dispatch(productActions.fetchProducts())
      .then((res) => setIsRefreshing(false))
      .catch((err) => {
        setIsRefreshing(false);
        setError(err.message);
      });
  }, [dispatch]);

  useEffect(() => {
    loadProducts()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [loadProducts]);

  // listen ton navigation changes
  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", loadProducts);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  const onSelectHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <MainText>No products found start adding some now!</MainText>
      </View>
    );
  }

  if (!isLoading && error) {
    return (
      <View style={styles.centered}>
        <MainText>An Error occured</MainText>
        <Button
          title="Try Again"
          color={colors.primary}
          onPress={loadProducts}
        />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      style={styles.flatlistWrapper}
      horizontal={false}
      numColumns={2}
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() =>
            onSelectHandler(itemData.item.id, itemData.item.title)
          }
        >
          <IconButton
            onPress={() =>
              onSelectHandler(itemData.item.id, itemData.item.title)
            }
          >
            <Ionicons name="ios-eye" color={colors.primary} size={35} />
          </IconButton>
          <IconButton
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          >
            <Ionicons name="ios-add-circle" color={colors.primary} size={30} />
          </IconButton>
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  flatlistWrapper: {
    width: "100%",
  },
});
export default ProductsOverviewScreen;
