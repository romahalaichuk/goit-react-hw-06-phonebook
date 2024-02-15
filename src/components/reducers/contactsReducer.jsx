import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact } from '../actions';

const contactsReducer = createReducer([], {
  [addContact]: (state, action) => {
    state.push(action.payload);
  },
  [deleteContact]: (state, action) => {
    return state.filter(contact => contact.id !== action.payload);
  },
});

export default contactsReducer;
