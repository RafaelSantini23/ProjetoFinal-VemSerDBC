import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";

export const rootReducer = combineReducers({
    AuthReducer
});

export type AppState = ReturnType<typeof rootReducer>;