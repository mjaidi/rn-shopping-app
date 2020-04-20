import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MainText from "../UI/MainText";
import Card from "../UI/Card";
import IconButton from "../UI/IconButton";
import CartItem from "./CartItem";
import colors from "../../constants/colors";

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <MainText style={styles.totalAmount} bold>
          ${amount.toFixed(2)}
        </MainText>
        <MainText style={styles.date}>{date}</MainText>
      </View>
      <IconButton onPress={() => setShowDetails((prev) => !prev)}>
        <Ionicons
          name={showDetails ? "ios-close" : "ios-eye"}
          color={colors.primary}
          size={35}
        />
      </IconButton>
      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  totalAmount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});
export default OrderItem;
