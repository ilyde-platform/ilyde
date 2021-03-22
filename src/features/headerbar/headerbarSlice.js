import { createSlice } from '@reduxjs/toolkit';

export const headerbarSlice = createSlice({
  name: 'headerbar',
  initialState: {
    "title": "Ilyde",
    "subtitle": ""
  },
  reducers: {
    setContentTitle: (state, action) => {
      const {title, subtitle} = action.payload;
      state.title = title;
      state.subtitle = subtitle;
    }
  },
});

export const { setContentTitle } = headerbarSlice.actions;

export const selectHeaderbar = state => state.headerbar;

export default headerbarSlice.reducer;