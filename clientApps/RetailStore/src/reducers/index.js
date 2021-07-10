import { combineReducers } from "redux";
import RawMaterialReducer from "./RawMaterialReducer";
import LoginReducer from "./Login";

export default combineReducers({
  rawMaterial:RawMaterialReducer,
  login:LoginReducer
})