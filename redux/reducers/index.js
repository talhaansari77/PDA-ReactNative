import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import CreateUserReducer from "./AuthUser";

let reducers = combineReducers({
  cartReducer: cartReducer,
  CreateUserReducer: CreateUserReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
