import { createSlice } from '@reduxjs/toolkit';

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    "darkMode": false,
  },
  reducers: {
    switchDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    }
  },
});

export const { switchDarkMode } = preferencesSlice.actions;

export const selectPreferences = state => state.preferences;

const preferencesReducer = preferencesSlice.reducer

export default preferencesReducer;
