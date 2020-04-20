import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => (
  <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
);

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default Card;
