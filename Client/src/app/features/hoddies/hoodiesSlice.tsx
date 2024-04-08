import { createSlice } from '@reduxjs/toolkit';

export const hoodiesSlice = createSlice({
  name: 'hoodies',
  initialState: {
    hoodie: [], // Assuming this is your initial state structure
    selectedHoodieId: null, // Initialize selected hoodie ID as null
  },
  reducers: {
    fetchHoodiesSuccess(state, action) {
      state.hoodie = action.payload;
    },
    fetchHoodiesIdSuccess(state, action) {
      state.selectedHoodieId = action.payload;
    },
  },
});

export const { fetchHoodiesSuccess, fetchHoodiesIdSuccess } = hoodiesSlice.actions;

export default hoodiesSlice.reducer;
