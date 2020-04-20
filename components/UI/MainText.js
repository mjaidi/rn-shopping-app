import React from "react";
import { Text, StyleSheet } from "react-native";

const MainText = ({ children, style, bold, numberOfLines }) => {
  const myTextStyle = bold ? styles.bold : styles.regular;

  return (
    <Text numberOfLines={numberOfLines} style={{ ...myTextStyle, ...style }}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  bold: {
    fontFamily: "open-sans-bold",
  },
  regular: {
    fontFamily: "open-sans",
  },
});
export default MainText;
