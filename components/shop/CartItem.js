import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MainText from "../UI/MainText";
import IconButton from "../UI/IconButton";
import colors from "../../constants/colors";

const CartItem = ({ quantity, title, amount, onDelete, deletable }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <MainText style={styles.quantity} bold>
          {quantity}
        </MainText>
        <MainText style={styles.title} bold>
          {title}
        </MainText>
      </View>
      <View style={styles.itemData}>
        <MainText styles={styles.amount} bold>
          ${amount.toFixed(2)}
        </MainText>
        {deletable && (
          <IconButton>
            <Ionicons
              name="ios-trash"
              color="red"
              onPress={onDelete}
              size={23}
            />
          </IconButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: colors.primary,
    fontSize: 16,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    width: Dimensions.get("window").width / 2,
  },
  amount: {
    fontSize: 15,
    marginRight: 20,
  },
});

export default CartItem;
