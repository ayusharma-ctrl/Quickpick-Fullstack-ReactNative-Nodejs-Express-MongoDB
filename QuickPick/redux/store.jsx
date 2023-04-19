import { configureStore } from "@reduxjs/toolkit";
import { authReducer, otherReducer } from "./reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    other: otherReducer,
  },
});

export default store;