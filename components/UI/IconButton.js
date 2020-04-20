import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import MainText from "./MainText";

const IconButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.mainView, ...props.style }}>
        <MainText style={styles.text}>{props.children}</MainText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});

export default IconButton;
