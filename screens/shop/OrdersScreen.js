import React, { useEffect, useState, useCallback } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../store/actions/orders";
import colors from "../../constants/colors";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  const loadOrders = useCallback(async () => {
    await dispatch(
      orderActions.fetchOrders().then(() => setIsRefreshing(false))
    );
  }, [dispatch]);

  useEffect(() => {
    loadOrders().then(() => setIsLoading(false));
  }, [loadOrders]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadOrders}
      refreshing={isRefreshing}
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => ({
  headerTitle: "Your Orders",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => navData.navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});

export default OrdersScreen;
