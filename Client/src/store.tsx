// store.ts

import { configureStore } from '@reduxjs/toolkit';
import tshirtsReducer from './app/features/tshirts/tshirtsSlice';
import stickersReducer from './app/features/stickers/stickersSlices'; // Corrected import
import mugsReducer from './app/features/mugs/mugSlice';
import hoddiesReducer from './app/features/hoddies/hoodiesSlice'; // Corrected import
import cartReducer from './app/features/cart/cartSlice'
const store = configureStore({
  reducer: {
    tshirts: tshirtsReducer,
    stickers: stickersReducer,
    mugs: mugsReducer,
    hoodies: hoddiesReducer ,
    cart: cartReducer
  },
});
export default store;


