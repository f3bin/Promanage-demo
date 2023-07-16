import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    // other reducers...
  },
});

export default store;

