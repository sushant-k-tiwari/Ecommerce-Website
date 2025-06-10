import { createSlice } from "@reduxjs/toolkit";

const freebiesCartSlice = createSlice({
  name: "freebies",
  initialState: {
    freebiescartItems: [],
    freebiesCount: 0,
    freebiestotalAmount: 0,
  },

  reducers: {
    freebiesaddCartProduct: {
      reducer: (state, action) => {
        let freebiescartIndex = state.freebiescartItems.findIndex(
          (item) => item.id === action.payload.id
        );

        if (freebiescartIndex >= 0) {
          state.freebiescartItems[freebiescartIndex].quantity += 1;
        } else {
          let tempProduct = { ...action.payload, quantity: 1 };
          state.freebiescartItems.push(tempProduct);
        }
      },
    },
    clearCart: (state) => {
      state.freebiescartItems = [];
      state.freebiestotalAmount = 0;
      state.freebiesCount = 0;
    },

    getfreebiesCartProducts: (state, action) => {
      return {
        ...state,
      };
    },
    getfreebiesCartCount: (state, action) => {
      let freebiescartCount = state.freebiescartItems.reduce((total, item) => {
        return item.quantity + total;
      }, 0);

      state.freebiesCount = freebiescartCount;
    },
    getfreebiesTotalAmount: (state, action) => {
      state.freebiestotalAmount = state.freebiescartItems.reduce(
        (acc, item) => {
          return acc + item.price * item.quantity;
        },
        0
      );
    },

    removefreebiesCartItem: (state, action) => {
      let index = state.freebiescartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.freebiescartItems.splice(index, 1);
      }
    },
  },
});

export const {
  freebiesaddCartProduct,
  removefreebiesCartItem,
  getfreebiesTotalAmount,
  getfreebiesCartProducts,
  getfreebiesCartCount,
  clearCart,
} = freebiesCartSlice.actions;
export default freebiesCartSlice.reducer;
