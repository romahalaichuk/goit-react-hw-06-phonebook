import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';

const App = () => {
  const [filter, setFilter] = useState('');

  const handleDeleteContact = id => {};

  const handleAddContact = contact => {};

  return (
    <Provider store={store}>
      <div className={styles.phonebookContainer}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addContact={handleAddContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter setFilter={setFilter} />

        <ContactList filter={filter} deleteContact={handleDeleteContact} />
      </div>
    </Provider>
  );
};

export default App;
