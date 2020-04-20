import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

import IconButton from "../../components/UI/IconButton";
import HeaderButton from "../../components/UI/HeaderButton";

import ProductItem from "../../components/shop/ProductItem";
import * as productActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);
  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(productActions.deleteProduct(id)),
      },
    ]);
  };
  const selectProduct = (id, title) => {
    props.navigation.navigate({
      routeName: "EditProduct",
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };
  return (
    <FlatList
      horizontal={false}
      numColumns={2}
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => selectProduct(itemData.item.id, itemData.item.title)}
        >
          <IconButton
            onPress={() => selectProduct(itemData.item.id, itemData.item.title)}
          >
            <Ionicons name="ios-create" color={colors.accent} size={35} />
          </IconButton>
          <IconButton onPress={() => deleteHandler(itemData.item.id)}>
            <Ionicons name="ios-trash" color={colors.primary} size={30} />
          </IconButton>
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "User Products",
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
          title="Menu"
          iconName="ios-create"
          onPress={() => navData.navigation.navigate("EditProduct")}
        />
      </HeaderButtons>
    ),
  };
};
export default UserProductsScreen;
