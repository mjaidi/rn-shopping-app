import { createStore, combineReducers, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import productsReducer from "./reducers/products";
import cartReducer from "./reducers/cart";
import ordersReducer from "./reducers/orders";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
