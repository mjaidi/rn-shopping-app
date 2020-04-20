import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

import IconButton from "../../components/UI/IconButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const onSelectHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };
  const ProductView = (itemData) => (
    <ProductItem
      title={itemData.item.title}
      price={itemData.item.price}
      image={itemData.item.imageUrl}
      onSelect={() => onSelectHandler(itemData.item.id, itemData.item.title)}
    >
      <IconButton
        onPress={() => onSelectHandler(itemData.item.id, itemData.item.title)}
      >
        <Ionicons name="ios-eye" color={colors.primary} size={35} />
      </IconButton>
      <IconButton
        onPress={() => dispatch(cartActions.addToCart(itemData.item))}
      >
        <Ionicons name="ios-add-circle" color={colors.primary} size={30} />
      </IconButton>
    </ProductItem>
  );

  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      style={styles.flatlistWrapper}
      horizontal={false}
      numColumns={2}
      data={products}
      renderItem={ProductView}
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
  flatlistWrapper: {
    width: "100%",
  },
});
export default ProductsOverviewScreen;
