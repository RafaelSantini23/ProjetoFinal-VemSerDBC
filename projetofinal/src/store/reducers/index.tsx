import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    authReducer,
    userReducer
});

export type AppState = ReturnType<typeof rootReducer>;