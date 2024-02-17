import { configureStore } from '@reduxjs/toolkit';
import phonebookReducer from './phonebookSlice';

export default configureStore({
  reducer: {
    phonebook: phonebookReducer,
  },
});
