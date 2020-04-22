import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

import Input from "../../components/UI/Input";
import * as productActions from "../../store/actions/products";

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

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((p) => p.id === prodId)
  );

  const initialState = {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidity: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formValidity: {
      formIsValid: editedProduct ? true : false,
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

  const submitHandler = useCallback(() => {
    if (!formState.formValidity.formIsValid) {
      Alert.alert("Form is not valid", "Please check form errors", [
        { text: "Ok" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={20}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            name="title"
            label="Title"
            errorText="Please enter a valid title"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.title}
            initialValid={formState.inputValidity.title}
            required
          />
          <Input
            name="imageUrl"
            label="Image URL"
            errorText="Please enter a valid image Url"
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.imageUrl}
            initialValid={formState.inputValidity.imageUrl}
            required
          />
          {!editedProduct && (
            <Input
              name="price"
              label="Price"
              errorText="Please enter a valid price"
              keyboardType="decimal-pad"
              onInputChange={inputChangeHandler}
              initialValue={formState.inputValues.price}
              initialValid={formState.inputValidity.price}
              required
              min={0.1}
            />
          )}
          <Input
            name="description"
            label="Description"
            errorText="Please enter a valid description"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.description}
            initialValid={formState.inputValidity.description}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => ({
  headerTitle: navData.navigation.getParam("productTitle")
    ? `Edit ${navData.navigation.getParam("productTitle")}`
    : "Add Product",
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName="ios-save"
        onPress={navData.navigation.getParam("submit")}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
