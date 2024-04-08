import { createSlice } from '@reduxjs/toolkit';

export const mugsSlice = createSlice({
  name: 'mugs',
  initialState: {
    mug: [], // Assuming this is your initial state structure
    selectedMugId: null, // Initialize selected Mug ID as null
  },
  reducers: {
    fetchMugsSuccess(state, action) {
      state.mug = action.payload;
    },
    fetchMugsIdSuccess(state, action) {
      state.selectedMugId = action.payload;
    },
  },
});

export const { fetchMugsSuccess, fetchMugsIdSuccess } = mugsSlice.actions;

export default mugsSlice.reducer;
