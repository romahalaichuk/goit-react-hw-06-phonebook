import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { addContact, deleteContact } = phonebookSlice.actions;

export default phonebookSlice.reducer;
