import { createStore, combineReducers, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import productsReducer from "./reducers/products";
import cartReducer from "./reducers/cart";
import ordersReducer from "./reducers/orders";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
