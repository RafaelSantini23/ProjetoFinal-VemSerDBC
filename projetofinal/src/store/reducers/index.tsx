import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import fundraiserReducer from "./fundraiserReducer";

export const rootReducer = combineReducers({
    authReducer,
    userReducer,
    fundraiserReducer
});

export type AppState = ReturnType<typeof rootReducer>;