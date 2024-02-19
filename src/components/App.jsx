import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.phonebookContainer}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm />
        <h2 className={styles.title}>Contacts</h2>
        <ContactList />
      </div>
    </Provider>
  );
};

export default App;
