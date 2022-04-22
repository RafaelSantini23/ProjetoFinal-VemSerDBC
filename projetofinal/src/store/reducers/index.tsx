import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import UserReducer from "./userReducer";

export const rootReducer = combineReducers({
    AuthReducer,
    UserReducer
});

export type AppState = ReturnType<typeof rootReducer>;