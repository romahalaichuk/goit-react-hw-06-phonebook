import { createReducer } from '@reduxjs/toolkit';
import { setFilter } from '../actions';

const filterReducer = createReducer('', {
  [setFilter]: (state, action) => action.payload,
});

export default filterReducer;
