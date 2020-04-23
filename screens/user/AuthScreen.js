import React, { useState, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import colors from "../../constants/colors";
import * as authActions from "../../store/actions/auth";

const formReducer = (state, action) => {
  switch (action.type) {
    case "FORM_UPDATE":
      const updatedValues = {
        ...state.inputValues,
        [action.inputId]: action.value,
      };
      const updatedValidity = {
        ...state.inputValidity,
        [action.inputId]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidity) {
        updatedFormIsValid = updatedFormIsValid && updatedValidity[key];
      }
      return {
        ...state,
        inputValues: updatedValues,
        inputValidity: updatedValidity,
        formValidity: { formIsValid: updatedFormIsValid },
      };
    default:
      return state;
  }
};

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const initialState = {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidity: {
      email: "",
      password: "",
    },
    formValidity: {
      formIsValid: false,
    },
  };

  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const inputChangeHandler = useCallback(
    (identifier, value, isValid) => {
      dispatchFormState({
        type: "FORM_UPDATE",
        value: value,
        isValid: isValid,
        inputId: identifier,
      });
    },
    [dispatchFormState]
  );

  const singUpHandler = () => {
    if (formState.formValidity.formIsValid) {
      if (isSignUp) {
        dispatch(
          authActions
            .signup(formState.inputValues.email, formState.inputValues.password)
            .then(() => props.navigation.navigate("Shop"))
        );
      } else {
        dispatch(
          authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          )
        ).then(() => props.navigation.navigate("Shop"));
      }
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={20}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              name="email"
              label="Email:"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue={formState.inputValues.email}
            />
            <Input
              name="password"
              label="Password:"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttons}>
              <Button
                title={isSignUp ? "Sign Up" : "Login"}
                color={colors.primary}
                onPress={singUpHandler}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title={isSignUp ? "Switch to Login" : "Switch to Sign Up"}
                color={colors.accent}
                onPress={() => setIsSignUp(!isSignUp)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 500,
    padding: 20,
  },
  buttons: {
    marginTop: 10,
  },
});

export default AuthScreen;
