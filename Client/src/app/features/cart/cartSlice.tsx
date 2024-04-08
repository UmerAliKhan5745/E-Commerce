import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
interface CartItem {
  _id: number; // Assuming _id is a number
  price: number;
  // Other properties...
}

interface CartState {
  items: CartItem[];
  subtotal: number;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
};

  
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const itemExists = state.items.find((item:any) => item._id === action.payload._id);
      // If the item doesn't exist, add it to the cart
      if (!itemExists) {
          const cartItems = [...state.items, action.payload];
                return {
              ...state,
              items: cartItems
          };
      }
      // If the item already exists, return the current state without any changes
      return state;
    },
    subtotal(state) {
      console.log(state)

      const sum = state.items.reduce((acc, item) => acc + item.price, 0);
      state.subtotal = sum;
    },    
    removeItem(state, action: PayloadAction<number>) {
      const cartItems = state.items.filter((item:any) => item._id !== action.payload);
      return {
        ...state,
        items: cartItems
    }; 
     },
    clearCart(state) {
      state.items = [];
      state.subtotal= 0
    },
  },
});

export const { addItem, removeItem, clearCart,subtotal } = cartSlice.actions;

export default cartSlice.reducer;
