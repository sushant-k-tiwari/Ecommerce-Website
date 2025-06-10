import { createSlice } from "@reduxjs/toolkit";

const freeCartSlice = createSlice({
  name: "freebies",
  initialState: {
    freecartItems: [],
    freeCount: 0,
  },

  reducers: {
    freeaddCartProduct: {
      reducer: (state, action) => {
        let freebiescartIndex = state.freecartItems.findIndex(
          (item) => item.id === action.payload.id
        );

        if (freebiescartIndex >= 0) {
          state.freecartItems[freebiescartIndex].quantity += 1;
        } else {
          let tempProduct = { ...action.payload, quantity: 1 };
          state.freecartItems.push(tempProduct);
        }
      },
    },

    getfreeProducts: (state, action) => {
      return {
        ...state,
      };
    },
    clearfreeCart: (state) => {
      state.freecartItems = [];
      state.freeCount = 0
    },

    getfreeCartCount: (state, action) => {
      let freecartCount = state.freecartItems.reduce((total, item) => {
        return item.quantity + total;
      }, 0);

      state.freeCount = freecartCount;
    },

    removefreeCartItem: (state, action) => {
      let index = state.freecartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.freecartItems.splice(index, 1);
      }
    },
  },
});

export const {
  freeaddCartProduct,
  getfreeCartCount,
  getfreeProducts,
  removefreeCartItem,
  clearfreeCart
} = freeCartSlice.actions;
export default freeCartSlice.reducer;
