import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import colors from "../constants/colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      ...defaultNavOptions,
    },
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-list" color={drawerConfig.tintColor} size={23} />
      ),
    },
  }
);

const OrdersNavigatior = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: {
      ...defaultNavOptions,
    },
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-cart" color={drawerConfig.tintColor} size={23} />
      ),
    },
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    defaultNavigationOptions: {
      ...defaultNavOptions,
    },
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-create" color={drawerConfig.tintColor} size={23} />
      ),
    },
  }
);

const PagesNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigatior,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: {
      ...defaultNavOptions,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: PagesNavigator,
});

export default createAppContainer(MainNavigator);
