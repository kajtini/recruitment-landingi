import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import cartsReducer from "../features/Carts/cartsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    carts: cartsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
