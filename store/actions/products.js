import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-shopping-cc128.firebaseio.com/products.json"
    );
    try {
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const resData = await response.json();

      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      // do stuff with the error
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    await fetch(
      `https://rn-shopping-cc128.firebaseio.com/products/${productId}.json?auth=${auth.token}`,
      {
        method: "DELETE",
      }
    );

    dispatch({
      type: DELETE_PRODUCT,
      productId: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  // this syntax is possible thanks to redux-thunk middleware
  return async (dispatch, getState) => {
    const auth = getState().auth;

    // with redux-thunk you can execute any async code you want
    const response = await fetch(
      `https://rn-shopping-cc128.firebaseio.com/products.json?auth=${auth.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: { id: resData.name, title, description, imageUrl, price },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const auth = getState().auth;

    // with redux-thunk you can execute any async code you want
    const response = await fetch(
      `https://rn-shopping-cc128.firebaseio.com/products/${id}.json?auth=${auth.token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      productData: { title, description, imageUrl },
    });
  };
};
