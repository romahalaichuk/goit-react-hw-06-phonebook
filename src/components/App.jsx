import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const store = configureStore({
  reducer: rootReducer,
  initialState: {
    contacts: [],
    filter: '',
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <div className="phonebookContainer">
        <h1 className="title">Phonebook</h1>
        <ContactForm />
        <h2 className="title">Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </Provider>
  );
};

export default App;
