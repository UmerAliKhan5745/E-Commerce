import { createSlice } from '@reduxjs/toolkit';

export const stickersSlice = createSlice({
  name: 'stickers',
  initialState: {
    sticker: [], // Assuming this is your initial state structure
    selectedStickerId: null, // Initialize selected sticker ID as null
  },
  reducers: {
    fetchStickersSuccess(state, action) {
      state.sticker = action.payload;
    },
    fetchStickersIdSuccess(state, action) {
      state.selectedStickerId = action.payload;
    },
  },
});

export const { fetchStickersSuccess, fetchStickersIdSuccess } = stickersSlice.actions;

export default stickersSlice.reducer;
