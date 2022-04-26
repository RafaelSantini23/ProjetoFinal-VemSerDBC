import { legacy_createStore as compose } from "redux";
import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  const devToolsRedux = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({
    reducer: rootReducer,
    
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;