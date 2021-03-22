  
import { configureStore } from '@reduxjs/toolkit';
import { headerbarSlice } from '../features/headerbar/headerbarSlice'

export default configureStore({
  reducer: {
    headerbar: headerbarSlice.reducer,
  },
});