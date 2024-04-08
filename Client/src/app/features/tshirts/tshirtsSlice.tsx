import { createSlice } from '@reduxjs/toolkit';

export const tshirtsSlice = createSlice({
  name: 'tshirts',
  initialState: {
    tshirt: [], // Assuming this is your initial state structure
    selectedTshirtId: null, // Initialize selected T-shirt ID as null
  },
  reducers: {
    fetchTshirtsSuccess(state, action) {
      state.tshirt = action.payload;
    },
    fetchTshirtsIdSuccess(state, action) {
      state.selectedTshirtId = action.payload;
    },
  },
});

export const { fetchTshirtsSuccess, fetchTshirtsIdSuccess } = tshirtsSlice.actions;

export default tshirtsSlice.reducer;
