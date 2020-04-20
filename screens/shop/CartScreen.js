import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList, StyleSheet, Button } from "react-native";
import MainText from "../../components/UI/MainText";
import Card from "../../components/UI/Card";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

import colors from "../../constants/colors";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <MainText style={styles.summaryText} bold>
          {" "}
          Total:{" "}
          <MainText style={styles.amount} bold>
            ${Math.round((cartTotal.toFixed(2) * 100) / 100)}
          </MainText>
        </MainText>
        <Button
          title="Order Now"
          color={colors.accent}
          disabled={cartItems.length === 0}
          onPress={() => dispatch(orderActions.addOrder(cartItems, cartTotal))}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            amount={itemData.item.sum}
            deletable
            onDelete={() =>
              dispatch(cartActions.deleteFromCart(itemData.item.productId))
            }
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = (navData) => ({
  headerTitle: "Your Cart",
});

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
    padding: 10,
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});

export default CartScreen;
