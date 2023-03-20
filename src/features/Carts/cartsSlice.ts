import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Cart } from "./cartsTypes";

interface CartsSliceState {
  carts: Cart[] | null;
  selectedCart: Cart | null;
}

const initialState: CartsSliceState = {
  carts: null,
  selectedCart: null,
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    cartsSet: (state, action: PayloadAction<Cart[]>) => {
      if (action.payload) {
        state.carts = action.payload;
      }
    },

    cartSelected: (state, action: PayloadAction<Cart>) => {
      state.selectedCart = action.payload;
    },

    cartRemoved: (state, action: PayloadAction<Cart>) => {
      const { id } = action.payload;

      if (state.selectedCart?.id === id) {
        state.selectedCart = null;
      }

      if (state.carts) {
        state.carts = state.carts?.filter((cart) => cart.id !== id);
      }
    },

    cartAdded: {
      reducer: (state, action: PayloadAction<Cart>) => {
        state.carts?.push(action.payload);
      },

      prepare: (cart: Cart) => ({ payload: { ...cart, id: nanoid() } }),
    },
  },
});

export const { cartsSet, cartSelected, cartRemoved, cartAdded } =
  cartsSlice.actions;

export const selectSelectedCart = (state: RootState) =>
  state.carts.selectedCart;
export const selectCarts = (state: RootState) => state.carts.carts;

export default cartsSlice.reducer;
